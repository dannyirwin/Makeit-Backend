const Project = require('../models/Project');

const { sendUser, sendUserWithProject } = require('../utilities/userUtilities');

exports.create = (request, response) => {
  const { project } = request.body;
  Project.query()
    .insert(project)
    .then(project => sendUserWithProject(project.author_id, response, project));
};

exports.update = async (request, response) => {
  const projectId = request.params.id;
  const newProject = request.body.project;

  Project.query()
    .findById(projectId)
    .update(newProject)
    .then(_ =>
      Project.query()
        .findById(projectId)
        .then(project =>
          sendUserWithProject(project.author_id, response, project)
        )
    );
};

exports.delete = (request, response) => {
  const projectId = request.params.id;
  Project.query()
    .findById(projectId)
    .then(project => project.author_id)
    .then(author_id => {
      Project.query()
        .deleteById(projectId)
        .then(_ => {
          sendUser(author_id, response);
        });
    });
};
