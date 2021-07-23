const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const followerController = require('../controllers/follower_followee_controller');

router.post('/follow', authenticate, followerController.create);

router.delete('/follow', authenticate, followerController.delete);

module.exports = { followRouter: router };
