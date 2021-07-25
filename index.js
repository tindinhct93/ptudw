const express = require('express');
require('dotenv').config()
const expressHbs = require('express-handlebars');
let app = express();
const helper = require('./controllers/helper.js')

// Set public static folder
app.use(express.static(__dirname+'/public'));
// Use view engine
let hbs = expressHbs.create({
   handlebars:require('handlebars'),
   extname: 'hbs',
   defaultLayout: 'layout',
   layoutsDir: __dirname + '/views/layouts/',
   partialsDir: __dirname + '/views/partials/',
   helpers: {
      createStarList: helper.createStarList,
      createStar: helper.createStar
   }
});

app.engine('hbs',hbs.engine);

app.set('view engine', 'hbs');

//Body Parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//Cookie parser
let cookieParser = require('cookie-parser');
app.use(cookieParser());

// Session
let session = require('express-session');
app.use(session({
   cookie:{httpOnly: true, maxAge: null},
   secret: 's3cret',
   resave: false,
   saveUninitialized: false
}))

let Cart = require('./controllers/cartController');
app.use((req,res,next)=> {
   let cart = new Cart(req.session.cart ? req.session.cart : {})
   req.session.cart = cart;
   res.locals.totalQuantity = cart.totalQuantity;
   res.locals.user = req.session.user ? req.session.user : '';
   res.locals.fullname = req.session.user ? req.session.user.fullname : '';
   res.locals.isLoggedIn = req.session.user ? true : false;

   next();
})


app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));
app.use('/cart',require('./routes/cartRouter'));
app.use('/momo',require('./routes/momoRouter'));
app.use('/users',require('./routes/userRouter'));
app.use('/contact',(req,res)=>res.render('contact'));


app.get('/sync',async (req,res)=> {
   let model =require('./models');
   await model.sequelize.sync();
   res.send('Sync completed');
})

app.use((err,req,res,next)=> {
   res.send(err);
})

const port = process.env.PORT || 80;
app.listen('80','192.168.1.19', () => {
   console.info(`Server started on port 80`);
});
/*
// Start sever
app.set('port',port);

let configVar = require('./config/https');
let httpobjects = {
   key: configVar.RSAKEY,
   cert:configVar.CERT
}
const https = require("https");
https.createServer(httpobjects, app).listen(5000)
console.log('Express server listening on port', port);
//app.listen(port, () => {
 //  console.log('Express server listening on port', port)});

*/