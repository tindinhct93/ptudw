const express = require('express');
const expressHbs = require('express-handlebars');
let app = express();

// Set public static folder
app.use(express.static(__dirname+'/public'));

// Use view engine
let hbs = expressHbs.create({
   handlebars:require('handlebars'),
   extname: 'hbs',
   defaultLayout: 'layout',
   layoutsDir: __dirname + '/views/layouts/',
   partialsDir: __dirname + '/views/partials/'
});

app.engine('hbs',hbs.engine);

app.set('view engine', 'hbs');

app.use('/',require('./routes/indexRouter'));
app.use('/products',require('./routes/productRouter'));


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