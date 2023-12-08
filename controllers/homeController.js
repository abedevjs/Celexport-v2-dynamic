const Contact = require('./../models/homeModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./errorController')

exports.getHomePage = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });//jd middleware itu utk kita modifikasi res, req sebelum sampai ke response terakhir ke user

});

exports.postMessage = catchAsync(async (req, res) => {
    const newContact = await Contact.create({
        fullName: req.body.fullName,
        companyName: req.body.companyName,
        email: req.body.email,
        sample: req.body.sample,
        message: req.body.message
    });

    res.status(200).json({
        status: 'success',
        data: {
            contact: newContact
        }
    });//jd middleware itu utk kita modifikasi res, req sebelum sampai ke response terakhir ke user
});

exports.downloadCatalogs = (req, res, next) => {
    console.log('8888888888888888888888888888888888888888888888888888888888888888888');
    const fileName = req.params.name;
    console.log(fileName);
    // const directorypath = `${__dirname}/../../dev-data/download/${fileName}.pdf`;
    const directorypath = `${__dirname}/../dev-data/download/`;

    res.download(`${directorypath}/${fileName}`, fileName, (err) => {
        if (err) {
            console.log(err);
            return next(new AppError('We are apologize, the file that you requested, is not available right now 😞. Please try again later!', 404));
        }
    })
};