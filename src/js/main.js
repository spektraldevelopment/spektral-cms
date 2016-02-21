(function(window) {

    var fData, Main = this,
        initData, title, content, save, article;

    function init() {
        fData = new Firebase("https://spektral-cms.firebaseio.com/");

        getRTIs();

        fData.child("article").on("value", function(snapshot) {
        	article = snapshot.val();
            title.innerHTML = article.title;
            content.innerHTML = article.content;
        });

        initData = {
            article: {
                title: "This is cool",
                content: "Blahblahlahlablahalbalala al hak ahkal hlkahlka hklha lk hkal"
            }
        };

        save = find('#save');
        attachEventListener(save, 'click', function() {
            setFData({
                article: {
                    title: title.innerHTML,
                    content: content.innerHTML
                }
            })
        });
    };

    function setFData(obj) {
        fData.set(obj);
    };

    function getRTIs() {
        title = find("#title");
        content = find("#content");

        attachEventListener(title, 'click', onDivClick);
        attachEventListener(content, 'click', onDivClick);
    };

    function onDivClick() {
        this.contentEditable = 'true';
    }

    //Utils

    function find(el) {
        return document.querySelector(el);
    };

    function attachEventListener(eventTarget, eventType, eventHandler) {
        if (eventTarget.addEventListener) {
            eventTarget.addEventListener(eventType, eventHandler, false);
        } else if (eventTarget.attachEvent) {
            eventType = "on" + eventType;
            eventTarget.attachEvent(eventType, eventHandler);
        } else {
            eventTarget["on" + eventType] = eventHandler;
        }
    };

    init();
}(window));
