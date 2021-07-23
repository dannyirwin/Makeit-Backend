const { sendUser } = require('../utilities/userUtilities');

const FollowerFollowee = require('../models/FollowerFollowee');

exports.create = (request, response) => {
  const { follower_followee } = request.body;
  FollowerFollowee.query()
    .insert(follower_followee)
    .then(follower_followee => {
      console.log(request.user);
      sendUser(request.user.id, response);
    });
};

exports.delete = (request, response) => {
  const { follower_followee } = request.body;
  FollowerFollowee.query()
    .delete()
    .where(follower_followee)
    .then(_ => sendUser(request.user.id, response));
};
