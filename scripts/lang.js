define([], function(){
    if(!String.prototype.trim){
        String.prototype.trim  = function(){
            var str = this.replace('^\s/', ''),
                end = str.length - 1,
                ws = /\s/;
            while( ws.test(str.charAt(end)) ){
                end--;
            }

            return str.slice(0, end + 1);
        }
    }

    var __hasProp = {}.hasOwnProperty;

    window.__extends = function(child, parent) {
        // copy own prop
        for (var key in parent) {
            if (__hasProp.call(parent, key)) {
                child[key] = parent[key];
            }
        }

        // prototype inhert
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;

        return child;
    }
    window.__slice = [].slice;

    window.__indexOf = [].indexOf || function(item) { 
        for (var i = 0, l = this.length; i < l; i++) { 
            if (i in this && this[i] === item) 
                return i; 
        } 
        return -1; 
    };

    window.__hasProp = {}.hasOwnProperty;

    window.__bind = function(fn, me) { 
        return function(){ 
            return fn.apply(me, arguments); 
        }; 
    };

    window.__deepcp = function(src) {
        return JSON.parse(JSON.stringify(src));
    }

});
