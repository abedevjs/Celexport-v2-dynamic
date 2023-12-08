const mongoose = require('mongoose');//Mongoose is an Object Data Modeling library for MongoDB and NodeJs for a higher lvl of abstraction
const validator = require('validator');

const quoteSchema = new mongoose.Schema({
    quoteNumber: String,
    validStart: String,
    validEnd: String,
    productName: String,
    quantity: String,
    container: String,
    weightTon: String,
    incoterms: String,
    portDischarge: String,
    country: String,
    paymentMethod: String,
    kurs: Number,
    fobRp: Number,
    fobUsd: String,
    fobTon: String,
    fullName: {
        type: String,
        trim: true,
        required: [true, 'Please provide your full name'],
        maxlength: [150, 'Name must have less or equal than 150 characters'],
        // minlength: [5, 'Name must have more or equal than 5 characters']
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, 'Please provide your company name'],
        maxlength: [150, 'Company name must have less or equal than 150 characters'],
        // minlength: [2, 'Company name must have more or equal than 2 characters']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide your email address'],
        maxlength: [150, 'Email must have less or equal than 150 characters'],
        validate: [validator.isEmail, 'Please provide a valid email']
    }
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;