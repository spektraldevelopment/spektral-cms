var
    express = require('express'),
    app = express(),
    fs = require("fs"), jsonFile;

app.use(express.static(__dirname + '/build/'));

jsonFile = readJsonFile('data.json');

//jsonFile.images[1].path = 'cms/images/iknowthatfeel.jpg';
//jsonFile.images[1].alt = 'A picture of a bear and a man sitting at a river bank'
//
//writeJsonFile();

app.listen(3000);
console.log('listening on port 3000');

//Read/write
function readJsonFile(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function writeJsonFile() {
    fs.writeFile('app/cms/data.json', JSON.stringify(jsonFile, null, 4), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

//Helper methods
function getValue(obj, key){
    var valueArray = [];
    searchObj(obj);
    function searchObj(o) {
        var k;
        for (k in o) {
            if (k === key) {
                valueArray.push(o[key]);
            }
            if (getType(o[k]) === 'object') {
                searchObj(o[k]);
            }
        }
    }

    function getType(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    if (valueArray.length === 0) {
        return false;
    } else if (valueArray.length === 1) {
        return valueArray[0];
    } else {
        return valueArray;
    }
}