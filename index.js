const express = require('express');
const expressHbs = require('express-handlebars');
let app = express();

// Set public static folder
app.use(express.static(__dirname+'/public'));

// Use view engine
let hbs = expressHbs.create({
   extname: 'hbs',
   defaultLayout: 'layout',
   layoutsDir: __dirname + '/views/layouts/',
   partialsDir: __dirname + '/views/partials/'
});

app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');

// Define the route
app.get('/', (req,res)=>{
   res.render('index');
});

app.get('/:page', (req,res)=>{
   let banners = {
      blog: "Our Blog",
      category: 'Shop Category',
      cart: "Shopping Cart"
   };
   let page = req.params.page;
   res.render(page, {banner: banners[page]});
});



// Start sever
app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'), ()=> {
   console.log(`Server is runing at port ${app.get('port')}`);
});