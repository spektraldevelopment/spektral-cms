(function(window){
    "use strict";
    //Code goes here

    var PostScreen = {}, uploadPicture, submitButton;

    PostScreen.init = function() {
        uploadPicture = document.querySelector('#uploadForm');
        submitButton = document.querySelector('#submitButton');

        console.log('submitButton: ' + submitButton);

        Spektral.attachEventListener(submitButton, 'click', onSubmitClick);
        Spektral.attachEventListener(uploadPicture, 'submit', onPicSubmit);

        console.log('PostScreen init');
    }

    function onPicSubmit(evt) {
        var formData = new FormData();
        var file = document.getElementById('userFileInput').files[0];
        formData.append('userFile', file);
        alert('file: ' + file);
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
//            $('#userFileInput').val('');
//            //setProgress(0);
//            var resJson = JSON.parse(xhr.responseText);
//            console.log(resJson.file + ' done, choose a file');
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

    window.PostScreen = PostScreen;

}(window));