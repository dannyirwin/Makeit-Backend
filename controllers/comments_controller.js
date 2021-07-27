const { sendUser } = require('../utilities/userUtilities');

const Comment = require('../models/Comment');
const { hintComment } = require('../database');
const Project = require('../models/Project');

exports.create = (request, response) => {
  const { comment } = request.body;
  Comment.query()
    .insert(comment)
    .then(comment => {
      Project.query()
        .findById(comment.project_id)
        .withGraphFetched('[author, comments]')
        .then(project => response.status(200).json(project));
    });
};

exports.delete = (request, response) => {
  console.log(request.params.id);
  //   const { follower_followee } = request.body;
  //   FollowerFollowee.query()
  //     .delete()
  //     .where(follower_followee)
  //     .then(_ => sendUser(request.user.id, response));
};
