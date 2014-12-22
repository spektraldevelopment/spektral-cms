(function(window){
    "use strict";
    //Code goes here

    var PostScreen = {}, uploadPicture, submitButton, uploadList;

    PostScreen.init = function() {
        uploadPicture = document.querySelector('#uploadForm');
        submitButton = document.querySelector('#submitButton');
        uploadList = document.querySelector('#uploadList');

        console.log('submitButton: ' + submitButton);

        Spektral.attachEventListener(submitButton, 'click', onSubmitClick);
        Spektral.attachEventListener(uploadPicture, 'submit', onPicSubmit);

        var picReq = new XMLHttpRequest();

        picReq.onload = function(e){
            var listRes = JSON.parse(picReq.responseText);

            if(listRes.length > 0) {
                populatePicList(listRes);
            }
        };

        picReq.open('GET', '/api/getPicList', true);
        picReq.send();

        console.log('PostScreen init');
    }

    function onPicSubmit() {
        var formData = new FormData();
        var file = document.getElementById('userFileInput').files[0];
        formData.append('userFile', file);
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('post', '/file-upload', true);

        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable)
                console.log("loading: " + Math.round((e.loaded / e.total) * 100));
        };
        xhr.onerror = function (e) {
            status('error while trying to upload');
        };
        xhr.onload = function (e) {
            $('#userFileInput').val('');
            console.log('LOAD!!!: ' + JSON.parse(xhr.responseText));
            //setProgress(0);
//            var resJson = JSON.parse(xhr.responseText);
//
//            console.log('Response: ' + JSON.stringify(resJson));
//
//            if (resJson.image) {
//                console.log('Image url: /img/uploads/' + resJson.savedAs);
//                window.open('./uploads/' + resJson.savedAs, 'upload', 'status=1, height = 300, width = 300, resizable = 0');
//            } else {
//                console.log('not an image');
//            }
        };
        xhr.send(formData);
        return false;
    }

    function onSubmitClick(evt) {
        uploadPicture.submit();
        console.log('onSubmitClick');
    }

    function populatePicList(list) {

        var listItem, fileName;
        list.forEach(function(item){

            listItem = Spektral.addElement(uploadList, 'li');
            fileName = Spektral.addElement(listItem, 'p', { innerHTML: item.file});
            //console.log('item: ' + item.file);
        });
    }

    window.PostScreen = PostScreen;

}(window));