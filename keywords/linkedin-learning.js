const axios = require('axios');
const fs = require('fs');

const download_file = function (url, filename) {
  return new Promise(function (resolve, reject) {
    return axios.get(url, {
      responseType: 'stream'
    }).then(function (response) {
      let [buffers, fileData] = [[], response.data];
      fileData.on('data', function (chunk) {
        return buffers.push(chunk);
      });
      return fileData.once('end', function () {
        fs.writeFileSync("./tmp/" + filename, Buffer.concat(buffers));
        return resolve();
      });
    });
  });
};

module.exports = {
  'download file': async (args, context) => {
    let filename = args.url.match(/\/([^\/]*)\?/g)[0];
    filename = filename.substr(1, filename.length - 2);
    await download_file(args.url, filename);
  },
};
