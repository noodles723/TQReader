define(['app/_page',
        
        //'controller/feed-list',
        //'controller/page-list',
        //'controller/post-list',
        //'controller/settings',

        'model/subscribe',
        'model/lists'
        //'model/home-page'
        //'model/posts',
        //'model/recently-tips',
        ],function(Page,
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
        //var lists = this.models.lists = new Lists();
        //var homePage = this.models.homePage = new HomePage();
        //var posts = this.models.posts = new Posts();
        //var recAndTips = this.models.recAndTips = new RecAndTips();

        // 创建控制器
        //var feedList = this.controllers.feedList = new FeenList();
        //var pageList = this.controllers.pageList = new PageList();
        //var postList = this.controllers.postList = new PostList();
        //var settings = this.controllers.settings = new Settings();

        // 初始化模型
        subscribe.init();
        //lists.init();

        // 初始化控制器

    }
    return MainPage;
}(Page));

return MainPage;
});
