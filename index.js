const express = require('express');
const expressHbs = require('express-handlebars');
let app = express();

// Set public static folder
app.use(express.static(__dirname+'/public'));
let helper = require('./controllers/helper');
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
   cookie:{httpOnly: true, maxAge: 30*24*60*60*1000 },
   secret: 's3cret',
   resave: false,
   saveUninitialized: false
}))
/*
let cart = require('./controllers/cartController');
app.use((req,res,next)=> {
   let cart = new Cart(req.session.cart ? req.session.cart : {})
   req.session.cart = cart;
   res.local.totalQuantity = cart.totalQuantity;
   next();
})
*/

app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));
app.use('/cart',require('./routes/cartRouter'));



app.get('/sync',async (req,res)=> {
   let model =require('./models');
   await model.sequelize.sync();
   res.send('Sync completed');
})

const port = process.env.PORT || 5000;
// Start sever
app.set('port',process.env.PORT || 5000);
app.listen(port, () => {
   console.log('Express server listening on port', port)
});