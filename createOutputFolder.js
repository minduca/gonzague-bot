var fs = require('fs');
var dir = './output_files';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}