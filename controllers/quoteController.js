const Quote = require('./../models/quoteModel');
const catchAsync = require('./../utilities/catchAsync')

exports.getQuotePage = catchAsync(async (req, res, next) => {
    res.status(200).send('quote')
})

exports.postQuote = catchAsync(async (req, res) => {
    const newQuote = await Quote.create({
        quoteNumber: req.body.quoteNumber,
        validStart: req.body.validStart,
        validEnd: req.body.validEnd,
        productName: req.body.productName,
        quantity: req.body.quantity,
        container: req.body.container,
        weightTon: req.body.weightTon,
        incoterms: req.body.incoterms,
        portDischarge: req.body.portDischarge,
        country: req.body.country,
        paymentMethod: req.body.paymentMethod,
        kurs: req.body.kurs,
        fobRp: req.body.fobRp,
        fobUsd: req.body.fobUsd,
        fobTon: req.body.fobTon,
        fullName: req.body.fullName,
        companyName: req.body.companyName,
        email: req.body.email
    });

    res.status(200).json({
        status: 'success',
        data: {
            quote: newQuote
        }
    })
});