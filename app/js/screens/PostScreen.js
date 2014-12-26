(function(window, socket){
    "use strict";

    var
        PostScreen = {}, uploadPicture, submitButton, uploadList, createPost,
        picArray, postObj = {},
        titleInput, descInput, latInput, longInput;

    PostScreen.init = function() {

        uploadPicture = document.querySelector('#uploadForm');
        submitButton = document.querySelector('#submitButton');
        uploadList = document.querySelector('#uploadList');
        createPost = document.querySelector('#createPost');

        Spektral.attachEventListener(submitButton, 'click', onSubmitClick);
        Spektral.attachEventListener(uploadPicture, 'submit', onPicSubmit);
        Spektral.attachEventListener(createPost, 'click', onCreatePost);

        titleInput = document.querySelector('#titleInput');
        descInput = document.querySelector('#descInput');
        latInput = document.querySelector('#latInput');
        longInput = document.querySelector('#longInput');

        Spektral.attachEventListener(titleInput, 'click', onInputFocus);
        Spektral.attachEventListener(descInput, 'click', onInputFocus);
        Spektral.attachEventListener(latInput, 'click', onInputFocus);
        Spektral.attachEventListener(longInput, 'click', onInputFocus);

        socket.on('thumbCreated', function(data) {
            populatePicList(data.arr);
        });

        console.log('PostScreen init');
    }

    function getPicArray(){
        var picReq = new XMLHttpRequest();

        picReq.onload = function(e){
            picArray = JSON.parse(picReq.responseText);

            if(picArray.length > 0) {
                populatePicList(picArray);
            }
            console.log('picArray: ' + picArray);
        };

        picReq.open('GET', '/api/getPicList', true);
        picReq.send();
    }

    function onInputFocus(evt){
        console.log('Input focus');
        Spektral.getTarget(evt).placeholder = '';
    }

    function onPicSubmit(e) {
        //e.preventDefault();
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
        };
        xhr.send(formData);
        return false;
    }

    function onSubmitClick(evt) {
        uploadPicture.submit();

        var file = document.getElementById('userFileInput').files[0];

        socket.emit('crop', { name: file.name });
    }

    function populatePicList(list) {
        var listItem, fileName, listLength;

        listLength = uploadList.children.length;

        list.forEach(function(item, index){
            console.log("CHILDREN: " + uploadList.children[index]);
            if (uploadList.children[index] === undefined) {
                listItem = Spektral.addElement(uploadList, 'li');
                fileName = Spektral.addElement(listItem, 'img', { src: './img/uploads/thumbs/' + item.thumb});
            }
        });
    }

    function onCreatePost(evt){
        postObj['title'] = titleInput.value;
        postObj['desc'] = descInput.value;
        postObj['pictures'] = picArray;
        postObj['latInput'] = latInput.value;
        postObj['longInput'] = longInput.value;

        console.log('New entry: ' + JSON.stringify(postObj));
    }

    window.PostScreen = PostScreen;

}(window, socket));