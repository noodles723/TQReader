define(['jquery',
        'model/_mod',
        'widget/event'
        ],function($,Model,Event){

/**
 * 列表模型
 *
 * @class Model::List
 * @constructor
 * @extends Model
 *
 * @uses Event
 * @jQuery
 */
var List = (function(_super){
    __extends(List,_super);

    function List(){

        List.__super__.constructor.apply(this,arguments);

        /**
         * api请求方法名
         *
         * @property method
         * @type String
         */
        this.method = 'feedList/list.php';

        /**
         * 模块名
         *
         * @property moduleName
         * @type String
         */
        this.moduleName = 'feedList';

        /**
         * 订阅表项
         *
         * @property {Object} feedList
         */
        this.feedList = [];

        /**
         * 初始化方法
         *
         * @method init
         */
        this.init = function(){
            // 是否有本地存储
            var list = localStorage.getItem('feedList');

            if(list){
                this.feedList = JSON.parse(list);
            } else {
                // 从服务器获取
                var userId = localStorage.getItem('tq_userId');
                this.fetch(userId);
            }
        };

        Event.bind('update-list',this.proxy(this.updateFeedList));

        Event.bind('update-server-list',this.proxy(this.updateServerList));
    }

    List.prototype.fetch = function(id) {
        this.method = 'feedList/getList.php';
        console.log('list.prototype.fetch id='+id);
        this.req({
            data: 'id=1'
        }).done(this.proxy(function(res){
            console.log(res);
            if(res.status === 'success') {
                // TODO 显示列表
                //Event.trigger('show-list',res.list);
                console.log(res.feedList);

                // 将feedlist写入本地
                this.feedList = res.feedList;
                //localStorage.setItem('feedList',JSON.stringify(res.list));
            } else if (res.status === 'noItem') {
                // TODO 没有订阅任何东西
                //Event.trigger('no-list-item');
            }
        }));
    };

    List.prototype.updateFeedList = function(res){
        console.log('add new feed list item');
        var newItem = {};
        newItem.title = res.title;
        newItem.link = res.link;
        newItem.rssId = res.rssId;
        // TODO 获取list item的层级level
        newItem.level = 1;
        // TODO 获取list item的unread
        newItem.unread = res.content.length;
        // TODO 获取list item的iconUrl
        // Event.trigger('fetch-icon-url',this.fetchIcon);
        this.feedList.push(newItem);

        // 显示feed list
        Event.trigger('show-new-list-item',newItem);
        // 将feed list同步致服务器
        var userId = localStorage.getItem('tq_userId');
        Event.trigger('update-server-list',this.feedList,userId);
    };

    List.prototype.updateServerList = function(list,userId){
        this.method = 'feedList/updateList.php';
        this.req({
            data:'list='+JSON.stringify(list)+'&userId='+userId
        }).done(this.proxy(function(res){
            console.log('update to server : status: '+res.status);
            // 将feedlist同步致本地
            //localStorage.setItem('feedList',JSON.stringify(res.list));
        }));
    };

    return List;
}(Model));

return List;
});
