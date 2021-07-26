const express = require('express');
const router = express.Router();
const authenticate = require('../routes/auth');

const projectController = require('../controllers/project_controller');

router.get('/projects/', authenticate, projectController.index);

router.get('/projects/:id', authenticate, projectController.show);

router.post('/projects', authenticate, projectController.create);

router.patch('/projects/:id', authenticate, projectController.update);

router.delete('/projects/:id', authenticate, projectController.delete);

module.exports = { projectsRouter: router };
