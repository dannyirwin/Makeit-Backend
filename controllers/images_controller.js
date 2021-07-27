const { sendUser } = require('../utilities/userUtilities');

const Image = require('../models/Image');

exports.create = (request, response) => {
  const { image } = request.body;
  console.log(image);
  Image.query()
    .insert(image)
    .then(image => {
      response.status(200).json(image);
    });
};

exports.delete = (request, response) => {
  const imageId = request.params.id;
  Image.query()
    .findById(imageId)
    .delete()
    .then(_ => response.status(200));
};
