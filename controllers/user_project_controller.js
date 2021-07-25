const { sendUser } = require('../utilities/userUtilities');

const UserProject = require('../models/UserProject');

exports.create = (request, response) => {
  const { user_project } = request.body;
  UserProject.query()
    .insert(user_project)
    .then(user_project => {
      sendUser(request.user.id, response);
    });
};

exports.delete = (request, response) => {
  const { user_project } = request.body;
  UserProject.query()
    .delete()
    .where(user_project)
    .then(_ => sendUser(request.user.id, response));
};
