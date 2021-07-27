const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const imageController = require('../controllers/images_controller');

router.post('/images', authenticate, imageController.create);

router.delete('/images/:id', authenticate, imageController.delete);

module.exports = { imagesRouter: router };
