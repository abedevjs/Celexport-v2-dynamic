const mongoose = require('mongoose');//Mongoose is an Object Data Modeling library for MongoDB and NodeJs for a higher lvl of abstraction

const dotenv = require('dotenv');

process.on('uncaught exception', err => {
    console.log(err.name, err.message);
    console.log('Server.js, Unhandled rejection 💥');
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

const hostedDatabase = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(hostedDatabase, {//klo online database pake ini
    // mongoose.connect(process.env.DATABASE_LOCAL, {//klo local database pake ini
    useNewUrlParser: true,//These here are just some options to deal with some deprecation warnings.
    //Go ahead and use the same
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log(`Message from server.js: "DB Connection succesful"`))

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Server.js, Unhandled rejection 💥');
    server.close(() => {
        process.exit(1);
    });
});