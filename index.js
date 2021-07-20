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


app.get('/sync',async (req,res)=> {
   let model =require('./models');
   await model.sequelize.sync();
   res.send('Sync completed');
})

app.use((err,req,res,next)=> {
   res.send('Something wrong happend');
})

const port = process.env.PORT || 5000;
// Start sever
app.set('port',process.env.PORT || 5000);

key = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAwQYxenDi1wCpiuvfCmmtgf4q5WoFqz1JX4QmFBFQ4iP4ky+v
ralOFn3pZk1/wURbZZu7nYEQOm+AX2esiZD6c1chdyHpGfuqyRsnAan967czlych
S15fvUtQ/Oi1um3YfSbtyRii/KUbvDAmdRcEZ4Cy9PKD8TEElxUSfHCNPhoJU3ms
ij+SNttVNGXTbfZvB+OKW9/QX+VwGCyl4p8Q9Ce6rPYvmql63eAdS6lQdOsByc8A
Gj6+2kpRs+RkUos0Pp5yaMZc2NXC5VjLXVJKexZgw3gRvOiKDBGE0GLIgWLK602U
FJvmKsznsD7PX48qxJWhMrlFeQunNgJlT9HlKQIDAQABAoIBACcEGHY2YTOyV5LU
EJZrO/4doRAUOSce0Tj0XjoKMf4z5SfjKLCCm10igE4EdkFbjtnf+7FfiCc3qIwg
SZjY7DbqMsKA4Tw2SZQy39SPRtshgdUYvLseTV3W3nzwkOMpFuxdNQ1D5JYKzath
VDSwvVwqgIHQj2juTo43XTA4E+SsRlAs1nzab4ZqTT18YQv9tXjDNJFdFqfGfYfL
2z26JswZkezMaB1/cOl3iFvXVk0bM3uYlSSWBXQtPv/9LE0H/e98yS8J7mLv5OIW
L5Q743r7BaC9SSNE89EQx4Z8FeZLVj2ABdtRhYZFBTQVVFDXK4AHON8XtjOQSzS7
UaC174ECgYEA9S3jopoomDytybFqrg5urWwTHZs3pwQuyILnYXTbPFJ16oW5uN9E
w6pfrHsyyUDqUiR3ZLAlNanCm6kKWuyI5eYIKb/531gapGqatInxZD4RFMlPLu4P
z6jMU0HtxtdYgowfoJsl4L+RCIfCMwcaxMyH1KPJP/v1zsT+mQJW+3ECgYEAyYsK
RERePYCMg+vE7b+PxGvHM0m3o/+HoXOUU2AJWi7HvyPZDpc5sKHlyPfkY4U3bD5l
XyLYRi9+C40yRQgpF5umj9tGGFadta39z4ICu8iYrYQG4Ej12XFirByBGLsoXJHY
S5I1jjm7T9JYJ+OWE0/Bt8wNPEAuqdQpdK6T+TkCgYEAg1K8Ddkii0BdGZ5E9MvY
Ll2n84CzE2tjH5U2F/Y+g5XrgN11t/cm3uL/8ePfNPrnR24u4SiUFaVDDptBZ6gw
P2uxzaL9VMrdIlnTWYZVXIr+HTMijZGHuIPCRYoXsRyhVPN28VCIvlP9fCMzOp/A
j865poTAA9ySMdlEQXKGYpECgYBvkTd6uPoOQ7YFZSOblNqKGjuoaZtt/otfVbL7
QIOM166dYcPLbu1xmP2x9YAJk3otwpCtTIW6vJmi3WPBkRXmSrS2l+TCnlgpdYq2
LztCJnZWP2rrB5iI6Vp8+j6AqUJblCTPGL3q4IyPUFqaokK2qAUNsLh27PSn8JmO
TQH/CQKBgQDMArjIDa+ZK4Ln22kPzwRklCMqNndtQIVdJOMAZKTB1kCqHXG2dPDD
q12hJ8jA2nh69EyjbpLdox9eQYdEMbnOH9IYe40s7MHZrV8w9URVGDh6Xhc79iNa
mFOWI2PQNm7dtFWFPgvd1+17dA15ReFO52S+/P+BIzzfNdxk4eAvoA==
-----END RSA PRIVATE KEY-----`
cert = `-----BEGIN CERTIFICATE-----
MIIDRzCCAi+gAwIBAgIFNzY3MDcwDQYJKoZIhvcNAQELBQAwWTERMA8GA1UEAxMI
SGVsbG8gQ0ExCzAJBgNVBAYTAk5QMRAwDgYDVQQIEwdCYWdtYXRpMRIwEAYDVQQH
EwlLYXRobWFuZHUxETAPBgNVBAoTCEhlbGxvIENBMB4XDTIxMDcxMTE0NTA1N1oX
DTIyMDcxMTE0NTA1N1owFDESMBAGA1UEAxMJMTI3LjAuMC4xMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwQYxenDi1wCpiuvfCmmtgf4q5WoFqz1JX4Qm
FBFQ4iP4ky+vralOFn3pZk1/wURbZZu7nYEQOm+AX2esiZD6c1chdyHpGfuqyRsn
Aan967czlychS15fvUtQ/Oi1um3YfSbtyRii/KUbvDAmdRcEZ4Cy9PKD8TEElxUS
fHCNPhoJU3msij+SNttVNGXTbfZvB+OKW9/QX+VwGCyl4p8Q9Ce6rPYvmql63eAd
S6lQdOsByc8AGj6+2kpRs+RkUos0Pp5yaMZc2NXC5VjLXVJKexZgw3gRvOiKDBGE
0GLIgWLK602UFJvmKsznsD7PX48qxJWhMrlFeQunNgJlT9HlKQIDAQABo1swWTAM
BgNVHRMBAf8EAjAAMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcD
AQYIKwYBBQUHAwIwGgYDVR0RBBMwEYcEfwAAAYIJbG9jYWxob3N0MA0GCSqGSIb3
DQEBCwUAA4IBAQAxRV86s0k/HmZ9FqGQuutDIq3xSGqGxd8aGx0jWcf8NPDVEwZ1
BR26fL68vs1bPTX61tHZj0uiAQ1TiW69ztRUg6YrDHj8lknTD6g+QWqzycIxMQUs
Ks2/ua1jTNk8VMC5hZo2BG7vcD9n/nl0QvNNovzRxzFNh+tMr8OPp5rEvVU8M4OX
24JxAIc9gKSDvjQmn7YPhoNu7b9AAz3j26qXSXMPIK74W9+z0A74sQnvTreOwNDC
pLWQxTWjw5V2f6yU2aBqglneQbH9UMJY/Wr0i/h0O8csipkcHRq1Lj6Oa7oYEA0c
rt2jmMv+SJlU2kUMynTMD18gOZWd2R2WPmdD
-----END CERTIFICATE-----`

//const https = require("https");
//https.createServer({ key, cert }, app).listen(5000)

app.listen(port, () => {
   console.log('Express server listening on port', port)
});

