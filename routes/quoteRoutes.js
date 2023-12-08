const express = require('express');
const quoteController = require('./../controllers/quoteController');
const viewController = require('./../controllers/viewsController');



const router = express.Router();
router
    .route('/')
    .get(viewController.viewQuote)
    .post(quoteController.postQuote);

// router.route('/nutmeg').get()

module.exports = router