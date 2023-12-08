const express = require('express');
const viewsController = require('./../controllers/viewsController');



const router = express.Router();

router.get('/', viewsController.viewHome);
router.get('/quote', viewsController.viewQuote);

module.exports = router