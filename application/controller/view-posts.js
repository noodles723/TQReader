define(['jquery',
        'widget/event'
        ],function($,Event){

/**
 * post控制器
 *
 * @class Controller::view-posts
 * @constructor
 *
 * @uses jQuery
 * @uses Event
 */
var Post = (function(){

    function Post(){
        /**
         * 网站名节点
         *
         * @property titleEl
         * @type jQueryObject
         */
        this.titleEl = $('#chrome-title>a');

        /**
         * entries node
         *
         * @property entriesEl
         * @type jQueryObject
         */
        this.entriesEl = $('#entries');

        /**
         * 所有posts数据
         *
         * @property posts
         * @type Object
         */
        this.posts = {};

        /**
         * 当前聚焦的post
         *
         * @property curPostNum
         * @type Number
         */
        this.curPostNum = 0;

        /**
         * 获取post事件
         *
         * @event fetched-posts
         * @param {Object} 从服务器获取到的订阅对象
         */
        Event.bind('fetched-posts',$.proxy(this.fetchedPosts,this));
    }

    /**
     * 初始化方法
     *
     * @method init
     * return {undefined} none
     */
    Post.prototype.init = function(){};

    /**
     * 获取posts事件
     *
     * @method fetchedPosts
     */
    Post.prototype.fetchedPosts = function(res){
        this.showTitle(res.title,res.link);
        this.showPosts(res.content);
    };
  
    /**
     * 显示标题
     *
     * @method showTitle
     */
    Post.prototype.showTitle = function(title,link){
        this.titleEl.attr('href',link);
        this.titleEl.prepend(title+' ');
    };

    /**
     * 显示所有post
     *
     * @method showPosts
     */
    Post.prototype.showPosts = function(posts){
        var i,length;
        this.posts = posts;

        length = posts.length>5 ? 5:posts.length;
        for(i=0;i<length;i++) {
            this.createPostCard(i,posts[i]);
        }
        
        // TODO 没有新的post显示时记得加上
        //$('<div id="scroll-filler" style="height:0px;"><div id="scroll-filler-recs-message" class="scroll-filler-message"><div>You have no more items.</div></div></div>').appendTo(this.entriesEl);
    };

    /**
     * 添加一个post card
     *
     * @method createPostCard
     * @param {Number} i post的序列号，或者ID {Object} post post的内容对象
     */
    Post.prototype.createPostCard = function(i,post){
        // 插入基本html
        var html = '<div class="entry entry-'+i+'" style="height:auto;">'+
            '<div class="card card-common">'+
                '<div class="card-content">'+
                    '<div class="entry-container">'+
                        '<div class="entry-main">'+
                            '<div class="entry-date"></div>'+
                            '<h2 class="entry-title">'+
                                '<a class="entry-title-link" href></a></h2>'+
                            '<div class="entry-author">'+
                                '<span class="entry-author-parent"> by <span class="entry-author-name"></span></span></div>'+
                            '<div class="entry-body"><div><div class="item-body"><div></div></div></div></div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="card-actions card-bottom">'+
                    '<div class="entry-actions">'+
                        '<span class="item-star star link unselectable" title="Add star"></span></div></div>'+
            '</div></div>';
        $(html).appendTo(this.entriesEl);

        // 添加内容
        var el = $('#entries .entry-'+i);
        el.find('.entry-date').append(post.pubDate);
        el.find('.entry-title-link').attr('href',post.link);
        el.find('.entry-title-link').append(post.title);
        el.find('.entry-author-name').append(post.creator);
        el.find('.item-body>div').append(post.description);

        // 解决防盗链
        var img = el.find('.item-body img');
        var src,j;
        for(j=0;j<img.length;j++){
            src = img[j].src;
            img[j].src = 'http://localhost/server/post/img.php?p='+src;
        }
    };

    return Post;
}());

return Post;
});
