const Project = require('../models/Project');

exports.create = (request, response) => {
  const { project } = request.body;
  Project.query().insert(project).then(response.status(200));
};
