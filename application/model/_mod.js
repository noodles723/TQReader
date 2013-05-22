define(['jquery',
        'widget/event'],
        function($,Event){

/**
 * 数据模型基类
 *
 * @class Model
 * @constructor
 *
 * @uses Event
 * @uses jQuery
 */
var Model = (function(){
    
    function Model(){
        
        /**
         * 根目录
         *
         * @property hostname
         * @type String
         */
        this.hostname = 'http://localhost/';

        /**
         * server路径
         *
         * @property indexPath
         * @type String
         */
        this.indexPath = 'server/';

        /**
         * server方法，二级路径
         *
         * @property method
         * @type String
         */
        this.method = '';

        /**
         * 模块名
         *
         * @property moduleName
         * @type String
         */
        this.moduleName = '';

        /**
         * 获得的数据
         *
         * @property result
         * @type Object
         */
        this.result = {};
    }

    /**
     * 初始化方法
     *
     * @method init
     */
    Model.prototype.init = function(){};

    /**
     * 将方法代理到上下文
     *
     * @method proxy
     * @return {Function} 被代理函数
     */
    Model.prototype.proxy = function(fn) {
        return $.proxy(fn, this);
    };

    /**
     * Model下发送请求封装方法
     *
     * @method req
     * @param {Object} requestOptions
     * @return {Object} DefferObject
     */
    Model.prototype.req = function(opt) {
        var defaultOpt = {
            type: 'GET',
            dataType: 'json',
            url: this.hostname+this.indexPath+this.method
        };
        opt = $.extend(defaultOpt,opt);

        // TODO 触发加载框
        //Event.trigger('start.loading',{event: this.moduleName});
        return $.ajax(opt)
                .success($.proxy(function(res){
                    //Event.trigger('end.loading',{event: this.moduleName});
                },this))
                .fail($.proxy(function(res){
                    if(res.status == 200){
                        return;
                    }
                    //Event.trigger('failed.loading',{event:this.moduleName,msg:res.status+':'+res.statusText});
                },this));
    };

    /**
     * 请求数据缓存并调用处理方法
     *
     * @method fetch
     */
    Model.prototype.fetch = function(data){
        this.req({
            data: data
        }).done(this.proxy(function(res){
            res = res || {};
            this.result = res;
            Event.trigger('fetched.'+this.moduleName,res);
        }));
    };

    return Model;
}());

return Model;
});
