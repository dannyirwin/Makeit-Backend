const Project = require('../models/Project');

const { sendUser, sendUserWithProject } = require('../utilities/userUtilities');

exports.index = async (request, response) => {
  const searchString = request.query.search.toLowerCase();
  const user = request.user;
  if (searchString) {
    const searchArray = searchString.split(' ');
    const projects = await Project.query().select(
      'title',
      'description',
      'id',
      'author_id'
    );
    let matchingIds = new Set();
    searchArray.map(subString => {
      const matching = projects.filter(
        ({ title, description, id, author_id }) => {
          return (
            (title?.toLowerCase().includes(subString) ||
              description?.toLowerCase().includes(subString)) &&
            author_id !== user.id
          );
        }
      );
      const ids = matching.map(project => project.id);
      matchingIds = [...matchingIds, ...ids];
      Project.query()
        .findByIds(matchingIds)
        .withGraphFetched('[author]')
        .then(projects => response.status(200).json({ projects }));
    });
  }
};

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
