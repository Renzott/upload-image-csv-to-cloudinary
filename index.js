const { resizeImage } = require("./imageConvert");
const { uploadCMS } = require("./upload");
const { csvToObject, ObjectToCSV, convertURLDrive } = require("./utils");

async function main() {

  var data = await csvToObject('data-out.csv');

  for (var [i, item] of data.entries()) {
    var headersUpdate = ["Foto externa", "Foto interna", "PDF Auxiliar"]
    for (var header of headersUpdate) {

      if ("PDF Auxiliar" == header) {
        /* item[header] = convertURLDrive(item[header]) */
      } else {

        var urlConvert = convertURLDrive(item[header]);

        /*  var imageConvert = await resizeImage(urlConvert); */

        if (!item[header].includes('res.cloudinary.com')) {
          var uploadImage = await uploadCMS(item[header]);

          item[header] = uploadImage['url']

        }

        console.log('Imagen procesada:' + i)
      }
    }

  }

  ObjectToCSV(data, "data-out2.csv")

}


main();