var
    express = require('express'),
    app = express(),
    fs = require("fs"),
    img = require('easyimage'),
    multer = require('multer'),
    jsonFile,
    imgs = ['png', 'jpg', 'jpeg', 'gif', 'bmp']; // only make thumbnail for these

//app.use(express.static(__dirname + '/build/'));

//app.configure(function () {
    app.use(multer({
        dest: './build/img/uploads/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase();
        }
    }));
    app.use(express.static(__dirname + '/build'));
//});

//app.get(__dirname + "/build", function (req, res) {
//    console.log('app.post: ' + JSON.stringify(req));
//    fs.readFile(req.files.displayImage.path, function (err, data) {
//        console.log('readFile');
//        var newPath = __dirname + "/build/img/uploads";
//        fs.writeFile(newPath, data, function (err) {
//            if (err) throw err;
//            console.log('It\'s saved!');
//            res.redirect("back");
//        });
//    });
//})

//app.post('/file-upload', function(req, res) {
//    // get the temporary location of the file
//    console.log("AHAHAHHA");
//    var tmp_path = req.files.thumbnail.path;
//    // set where the file should actually exists - in this case it is in the "images" directory
//    var target_path = '/img/uploads/' + req.files.thumbnail.name;
//    // move the file from the temporary location to the intended location
//    fs.rename(tmp_path, target_path, function(err) {
//        if (err) throw err;
//        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
//        fs.unlink(tmp_path, function() {
//            if (err) throw err;
//            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
//        });
//    });
//});

app.post('/api/upload', function (req, res) {
    console.log("CHECK IT OUT: " + imgs.indexOf(getExtension(req.files.userFile.name)));
    if (imgs.indexOf(getExtension(req.files.userFile.name)) != -1) {
        img.info(req.files.userFile.path, function (err, stdout, stderr) {
            //if (err) throw err;
            console.log(stdout); // could determine if resize needed here
            img.rescrop(
                {
                    src: req.files.userFile.path, dst: fnAppend(req.files.userFile.path, 'thumb'),
                    width: 50, height: 50
                },
                function (err, image) {
                    //if (err) throw err;
                    res.send({image: true, file: req.files.userFile.originalname, savedAs: req.files.userFile.name, thumb: fnAppend(req.files.userFile.name, 'thumb')});
                }
            );
        });
    } else {
        res.send({image: false, file: req.files.userFile.originalname, savedAs: req.files.userFile.name});
    }
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