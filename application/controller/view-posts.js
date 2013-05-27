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
        this.titleEl = $('#chrome-title a');

        /**
         * entries node
         *
         * @property entriesEl
         * @type jQueryObject
         */
        this.entriesEl = $('#entries');

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
        var i,el;
        for(i=0;i<posts.length;i++) {
            this.createPostCard(i);
            el = $('#entries .entry-'+i);
            el.find('.entry-date').append(posts[i].pubDate);
            el.find('.entry-title-link').attr('href',posts[i].link);
            el.find('.entry-title-link').append(posts[i].title);
            el.find('.entry-author-name').append(posts[i].creator);
            el.find('.item-body>div').append(posts[i].description);
            // 解决防盗链
            var img = el.find('.item-body img');
            var src,j;
            for(j=0;j<img.length;j++){
                src = img[j].src;
                img[j].src = 'http://localhost/server/post/img.php?p='+src;
            }
        }
        
        $('<div id="scroll-filler" style="height:0px;"><div id="scroll-filler-recs-message" class="scroll-filler-message"><div>You have no more items.</div></div></div>').appendTo(this.entriesEl);
    };

    /**
     * 添加每个post的基本html
     *
     * @method createPostCard
     * @param {Number} i post的序列号，或者ID
     */
    Post.prototype.createPostCard = function(i){
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
    };
    return Post;
}());

return Post;
});
