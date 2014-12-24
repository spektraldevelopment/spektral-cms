var
    express = require('express'),
    app = express(),
    fs = require("fs"),
    //easyImg = require('easyimage'),
    lwip = require('lwip'),
    multer = require('multer'),
    jsonFile, tempImageArray = [],
    imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp']; // only make thumbnail for these

app.use(multer({
    dest: './build/img/uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase();
    }
}));

app.use(express.static(__dirname + '/build'));

app.post('/api/upload', function (req, res) {
    //res.send({file: req.files.userFile.originalname, savedAs: req.files.userFile.name}).redirect('back');
    tempImageArray.push({file: req.files.userFile.name});
    tempImageArray.forEach(logArray);

    lwip.open(req.files.userFile.path, function(err, image){
        if (err) {
            console.log('Somethings wrong: ' + err);
        } else {
            image.batch()
                .crop(128, 128)       // crop a 200X200 square from center
                .writeFile('./build/img/uploads/thumbs/' + req.files.userFile.name, function(err){
                    if (err) {
                        console.log('Crop error: ' + err);
                    } else {
                        console.log('Crop Complete.');
                    }
                });
        }
    });
});

app.get('/api/getPicList', function(req, res){
    res.send(tempImageArray);
});


jsonFile = readJsonFile('data.json');

//jsonFile.images[1].path = 'cms/images/iknowthatfeel.jpg';
//jsonFile.images[1].alt = 'A picture of a bear and a man sitting at a river bank'
//
//writeJsonFile();

var server = app.listen(3000, function () {
    console.log('listening on port %d', server.address().port);
});

////////////////////////
////UTILS
////////////////////////

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

function getExtension(fn) {
    return fn.split('.').pop();
}

function fnAppend(fn, insert) {
    var arr = fn.split('.');
    var ext = arr.pop();
    insert = (insert !== undefined) ? insert : new Date().getTime();
    return arr + '.' + insert + '.' + ext;
}

function stripExt(str) {
    var formats = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], newStr;
    formats.forEach(function(fmt){
        if (str.match(fmt) !== null) {
            newStr = str.replace(fmt, "");
        }
    })
    return newStr;
}

function logArray(element, index, array) {
    console.log(JSON.stringify(element));
}