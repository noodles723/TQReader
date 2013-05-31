define(['app/_page',
        
        //'controller/feed-list',
        'controller/view-list',
        'controller/view-posts',
        //'controller/settings',

        'model/subscribe',
        'model/lists'
        //'model/home-page'
        //'model/posts',
        //'model/recently-tips',
        ],function(Page,
            ListView,
            PostView,
            Subscribe,
            Lists){

/**
 * 主页面
 *
 * @class Page::Main
 * @constructor
 * extends Page
 */
var MainPage = (function(_super){

    __extends(MainPage, _super);

    function MainPage(){
        MainPage.__super__ .constructor.apply(this, arguments);
         
        // 创建模型
        var subscribe = this.models.subscribe = new Subscribe();
        var lists = this.models.lists = new Lists();
        //var homePage = this.models.homePage = new HomePage();
        //var posts = this.models.posts = new Posts();
        //var recAndTips = this.models.recAndTips = new RecAndTips();

        // 创建控制器
        //var feedList = this.controllers.feedList = new FeedList();
        var listView = this.controllers.listView = new ListView();
        var postView = this.controllers.postView = new PostView();
        //var settings = this.controllers.settings = new Settings();

        // 初始化模型
        subscribe.init();
        lists.init();

        // 初始化控制器
        listView.init();
        postView.init();
        
    }
    return MainPage;
}(Page));

return MainPage;
});
