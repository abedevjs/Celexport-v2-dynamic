const express = require('express');//Express is a NodeJs framework for a higher lvl of abstraction
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
const helmet = require('helmet');
const cors = require('cors');
const csp = require('content-security-policy');
const compression = require('compression');
const AppError = require('./utilities/appError');
const globalError = require('./controllers/errorController')
const homeRouter = require('./routes/homeRoutes');
const quoteRouter = require('./routes/quoteRoutes');
const catalogRouter = require('./routes/catalogRoutes')
const viewRouter = require('./routes/viewRoutes');

//Set express using command syntax app
const app = express();

//Set CORS utk bisa sharing
app.use(cors());

//Biar ga error di Content-Security-Policy dibrowser
const cspPolicy = {
    // CrossOriginResourcePolicy: 'cross-origin',
    // CrossOriginOpenerPolicy: 'same-origin',
    // CrossOriginEmbedderPolicy: 'credentialles',
    // reportUri: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6784623147527364608'
    scriptSrc: 'strict-dynamic',
    objectSrc: 'none',
    defaultSrc: 'none',
    baseUri: 'none',
}
const localCSP = csp.getCSP(cspPolicy);
app.use(localCSP);



// app.use((req, res, next) => {
//     // res.header('Cross-Origin-Resource-Policy', 'cross-origin')
//     // res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
//     res.set({
//         'Cross-Origin-Resource-Policy': 'cross-origin',
//         // CrossOriginEmbedderPolicy: 'require-corp',
//         // 'Cross-Origin-Opener-Policy': 'cross-origin',
//         'Access-Control-Allow-Origin': 'https://linkedin.com',
//         'Access-Control-Allow-Credentials': true

//     });
//     // console.log(res.header);
//     next();
// });

// app.use((req, res, next) => {
//     res.header('Cross-Origin-Embedder-Policy', 'credentialless')
//     next();
// });

//Set pug as our view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Builtin express middleware utk mengakses statif file
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(`${__dirname}/public`));

//Set security on HTTP header
app.use(helmet());

//Utk logger di console terminal status route kita, we set only works in development
if (process.env.NODE_ENV === 'development') {
    console.log(`We are now on ${process.env.NODE_ENV}`);
    app.use(morgan('dev'));
};

//Prevent mulitple request from 1 ip
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in one hour'
});
app.use('/api', limiter);



//Body Parser/Reader
app.use(express.json({ limit: '10kb' }));//middleware yg membuat kita bisa membaca req.body

//Prevent NoSQL injection
app.use(mongoSanitize());

//Prevent XSS attacks
app.use(xss());

//Compress file input (if any)
app.use(compression());

//A Middleware. this will enable to use req object of (req, res) http. misalnya (req.body)
app.use(express.json());

//Time Stamp
app.use((req, res, next) => {//ini di sebut global middleware krn seluruh request ke routes dibwh, lwt sini sebelumnya
    req.timeIn = new Date().toISOString();//variable req.timeIn ini bs kita akses di middleware selanjutnya, meksipun
    //variable ini dalam block scope yg berbeda
    next()
})//This is how we create our own middleware function

// app.use('/', localCSP, viewRouter);
// app.use('/api/v2/', localCSP, homeRouter);
app.use('/nutmeg', localCSP, homeRouter);
// app.use('/catalog', localCSP, catalogRouter);
app.use('/api/v1/quote', localCSP, quoteRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
});

app.use(globalError);

module.exports = app;