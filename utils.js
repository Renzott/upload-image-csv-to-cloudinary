var URL = require('url');
var fs = require('fs')

const fastcsv = require('fast-csv');
const ObjectsToCsv = require('objects-to-csv');

function convertURLDrive(actual_url) {

    var parseURL = URL.parse(actual_url)

    if (actual_url && parseURL.host.includes('drive')) {
        var idImage = parseURL.pathname.split("/")[3];

        var finalURL = `https://drive.google.com/uc?export=view&id=${idImage}`

        return finalURL
    }

    return actual_url

}


function csvToObject(filename) {
    return new Promise((resolve, _) => {

        var dataArr = [];
        var ws = fs.createReadStream(filename)

        fastcsv.parseStream(ws, { headers: true })
            .on("data", function (data) {
                dataArr.push(data);
            })
            .on("end", function () {
                return resolve(dataArr);
            });
    })
        .catch(err => { throw err });
}


async function ObjectToCSV(object, filename) {

    const csv = new ObjectsToCsv(object);
    await csv.toDisk(filename);

}

module.exports = { convertURLDrive, csvToObject, ObjectToCSV }