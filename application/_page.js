define([
        './widget/auth'
        ], function(Auth) {

/**
 * 所有页面类的基类
 *
 * @class Page
 * @constructor 
 **/
var Page = (function() {

    function Page(){
        
        var redictUrl;
        if(window.pageinfo.name === 'login') {
            redictUrl = this.host + this.indexPath;
        }
        // 用户认证
        //Auth.check(redictUrl);

        /**
         * api主机地址
         * 
         * @property host
         * @type String
         * @default 'http://localhost/'
         **/
        this.host = 'http://localhost/';

        /**
         * 本页面地址（相对地址）
         *
         * @property path
         * @type String
         * @default '/#{window.pageinfo.name}.html'
         **/
        this.path = window.pageinfo.name + '.html';  // abstruct

        /**
         * 主页地址
         *
         * @property indexPath
         * @type String
         * @default '/main.html'
         **/
        this.indexPath = 'server/';

        /**
         * 页面内所有控制器
         *
         * @property controllers
         * @type Object
         * @default {}
         **/
        this.controllers = {};

        /**
         * 页面内所有模型
         *
         * @property models
         * @type Object
         * @default {}
         **/
        this.models = {};
        
    }

    /**
     * 将方法/函数代理到当前页面的上下文下
     *
     * @method proxy
     * @return {Function} 被代理的函数
     **/
    Page.prototype.proxy = function(fn) {
        return $.proxy(fn, this);
    };

    return Page;
}());

return Page;

});
