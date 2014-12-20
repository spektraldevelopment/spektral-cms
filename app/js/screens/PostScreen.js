(function(window){
    "use strict";
    //Code goes here

    var PostScreen = {}, uploadPicture, submitButton;

    PostScreen.init = function() {
        uploadPicture = document.querySelector('#uploadPicture');
        submitButton = document.querySelector('#submitButton');

        Spektral.attachEventListener(submitButton, 'click', onSubmitClick);
        console.log('PostScreen init');
    }

    function onSubmitClick(evt) {
        uploadPicture.submit();
        console.log('onSubmitClick');
    }

    window.PostScreen = PostScreen;

}(window));