(function(){
    window._cookie = {
        // get cookie
        get: function(name){
            var value = document.cookie;
            var start = value.indexOf(' '+name+'=');
            var end;

            if(start == -1){
                start = value.indexOf(name+'=');
            }
            if(start == -1){
                value = null;
            } else {
                start = value.indexOf('=',start)+1;
                end = value.indexOf(';',start);
                if(end == -1){
                    end = value.length;
                }
                value = unescape(value.substring(start,end));
            }
            return value;
        },
        // set cookie
        set: function(name,value,time){
            if (time) {
                var expires = new Date(time).toUTCString();
                document.cookie = name+'='+value+';expires='+expires;
            } else {
                document.cookie = name+'='+value;
            }
        }
    };

    /*window._localStorage = {
        set: function(name,value){
            //try{
                //var stringValue = JSON.stringify(value);
                //window.localStorage.setItem(name,stringValue);
            //} catch(e){
                window.localStorage.setItem(name,value);
            //}
        },
        get: function(name){
            var value = window.localStorage.getItem(name);
            //try{
                //return JSON.parse(value);
            //} catch(e){
                return value;
            //}
        },
        remove: function(name){
            window.localStorage.removeItem(name);
        }
    };*/
})();
