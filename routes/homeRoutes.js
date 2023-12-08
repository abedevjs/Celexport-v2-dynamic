const express = require('express');
const router = express.Router();
const homeController = require('./../controllers/homeController');
const viewController = require('./../controllers/viewsController');



router
    .route('/')
    // .get(homeController.getHomePage)
    .get(viewController.viewHome)
    .post(homeController.postMessage);

router.route('/:name').get(homeController.downloadCatalogs);
router.route('/quote').get(viewController.viewQuote);

module.exports = router