const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const commentsController = require('../controllers/comments_controller');

router.post('/comments', authenticate, commentsController.create);

router.delete('/comments/:id', authenticate, commentsController.delete);

module.exports = { commentsRouter: router };
