var axios = require('axios');
var FormData = require('form-data');
var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'renzott',
  api_key: '763863132343491',
  api_secret: '2MebcjnTNJckbrPInyNr6qhhNNw'
});

async function uploadCMS(url) {

  try {

    /* var uploadStr = 'data:image/png;base64,' + Buffer.from(buffer).toString('base64') */

    var uploadData = await cloudinary.uploader.upload(url, {
      overwrite: true,
      timeout:60000,
      width: 1920
    });

    return uploadData;
 } catch (error) {
    console.log(`An error occurred during processing`);
    console.log(error)
    return { url }
}


}

module.exports = { uploadCMS }
