var
    express = require('express'),
    app = express(),
    fs = require("fs"), jsonFile;

app.use(express.static(__dirname + '/app'));

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function writeToJSONFile() {
    fs.writeFile('app/data2.json', JSON.stringify(jsonFile, null, 4), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

jsonFile = readJsonFileSync('app/data.json');

jsonFile.discography.artist = 'Some Other Band';

console.log('Artist: ' + jsonFile.discography.artist);

writeToJSONFile();


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

app.listen(3000);
console.log('listening on port 3000');