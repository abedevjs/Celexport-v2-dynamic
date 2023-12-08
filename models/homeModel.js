const mongoose = require('mongoose');//Mongoose is an Object Data Modeling library for MongoDB and NodeJs for a higher lvl of abstraction
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    fullName: {
        type: String,
        trim: true,
        required: [true, 'Please provide your full name'],
        maxlength: [150, 'Name must have less or equal than 150 characters'],
        minlength: [5, 'Name must have more or equal than 5 characters']
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, 'Please provide your company name'],
        maxlength: [150, 'Company name must have less or equal than 150 characters'],
        minlength: [2, 'Company name must have more or equal than 2 characters']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide your email address'],
        maxlength: [150, 'Email must have less or equal than 150 characters'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    sample: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        trim: true
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;