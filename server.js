var
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    fs = require("fs"),
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
    tempImageArray.push({file: req.files.userFile.name, thumb: stripExt(req.files.userFile.name) + '-thumb.jpg'});
});

io.on('connection', function (socket) {

    socket.on('crop', function(fileData){
        var
            pathToImage = "./build/img/uploads/" + fileData.name,
            thumbPath = './build/img/uploads/thumbs/' + stripExt(fileData.name) + '-thumb.jpg';

        waitForFile(pathToImage, function(){
            createThumb(pathToImage, thumbPath, function(){
                socket.emit('thumbCreated', { arr: tempImageArray });
            });
        });
    });

    socket.on('new-post', function(data){
        data.entry['pictures'] = tempImageArray;
        var postArray = jsonFile['posts'];
        postArray.push(data.entry);
        writeJsonFile();
        console.log('new post: ' + JSON.stringify(data.entry));
    });

});

jsonFile = readJsonFile('data.json');

server.listen(3000, function () {
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
    fs.writeFile('data.json', JSON.stringify(jsonFile, null, 4), function (err) {
        if (err) {
            console.log('JSON save error: ' + err);
        } else {
            console.log('JSON data saved!');
        }
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
    });
    return newStr;
}

function waitForFile(path, callback) {
    fs.exists(path, function(exists) {
        if (exists) {
            console.log('Exists');
            callback();
        } else {
            waitForFile(path, callback);
        }
    });
}

function createThumb(path, thumbPath, callback) {
    lwip.open(path, function(err, image){
        if (err) {
            console.log('lwip error: ' + err + ' path: ' + path);
            //createThumb(path, thumbPath, callback);
        } else {
            console.log('width: ' + image.width() + ' height: ' + image.height());

            image.batch()
                .resize(image.width() / 4, image.height() / 4)
                .crop(64, 64)       // crop a 200X200 square from center
                .writeFile(thumbPath, function(err){
                    if (err) {
                        console.log('Crop error: ' + err);
                    } else {
                        console.log('Crop Complete.');
                        callback();
                    }
                });
        }
    });
}

function logArray(element, index, array) {
    console.log("Array: " + JSON.stringify(element));
}