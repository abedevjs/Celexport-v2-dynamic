const express = require('express');
const router = express.Router();
const catalogController = require('./../controllers/catalogController');


router.route('/:name').get(catalogController.downloadCatalogs);

module.exports = router