var
    express = require('express'),
    app = express(),
    fs = require("fs"),
    easyImg = require('easyimage'),
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
    //console.log('imageArray: ' + tempImageArray);
    tempImageArray.forEach(logArray);
//    res.redirect('back');
    if (imgs.indexOf(getExtension(req.files.userFile.name)) != -1) {

        easyImg.info(req.files.userFile.path).then(
            function(file) {
                console.log("INFO!!!: " + file);
            }, function (err) {
                console.log("AWW FUCK!!!: " + err);
            }
        );

        easyImg.rescrop({
            src: req.files.userFile.path, dst:'/build/img/uploads/thumbs/' + req.files.userFile.name,
            width:500, height:500,
            cropwidth:128, cropheight:128,
            x:0, y:0
        }).then(
            function(image) {
                console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
            },
            function (err) {
                console.log(err);
            }
        );
//        img.info(req.files.userFile.path, function (err, stdout, stderr) {
////            //if (err) throw err;
//            img.rescrop(
//                {
//                    src: req.files.userFile.path, dst: fnAppend(req.files.userFile.path, 'thumb'),
//                    width: 50, height: 50
//                },
//                function (err, image) {
//                    //if (err) throw err;
//                    //res.send({image: true, file: req.files.userFile.originalname, savedAs: req.files.userFile.name, thumb: fnAppend(req.files.userFile.name, 'thumb')});
//                    console.log('Imaged saved to: ' + req.files.userFile.name);
//                }
//            );
//        });
//    } else {
//        //res.send({image: false, file: req.files.userFile.originalname, savedAs: req.files.userFile.name});
    }
    res.redirect('back');
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

function logArray(element, index, array) {
    console.log(JSON.stringify(element));
}