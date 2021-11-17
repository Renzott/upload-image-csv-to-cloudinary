const sharp = require('sharp');
var axios = require('axios');

async function resizeImage(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        
        const convertImage =
            await sharp(response.data)
                .resize(1920)
                .png()
                .toBuffer();

        return convertImage;
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
        console.log(url)
        return null;
    }
}

module.exports = { resizeImage }