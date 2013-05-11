define([], function(){
    
    window.__extends = function(child, parent) {
        // 寄身组合式继承
        function F() {
            this.constructor = child;
            this.prototype = parent.prototype;
        }
    
        child.prototype = new F();    
        child.__super__ = parent.prototype;

        return child;
    };

    // 函数绑定
    window.__bind = function(fn, context){
        return function(){
            return fn.apply(context, arguments);  
        };
    };

    window.__slice = [].slice;
});
