define(['jquery'],function($){

    var Screen = {
        pageName: window.pageinfo.name,

        fitScreen: function(){
            switch(this.pageName){
                case 'overview':
                    $(window).resize(this.fitOverview);
                    this.fitOverview();
                    break;
                default:
                    break;
            }
        },

        fitOverview: function(){
            var height = window.innerHeight;
            // 订阅列表
            $('#scrollable-sections').css('height',(height-125)+'px');
            // post列表
            $('#viewer-entries-container').css('height',(height-68)+'px'); 
            // 确认背景
            $('body>[role="bg"]').css({'opacity':'0.5','width':window.innerWidth+'px','height':height+'px'});
            // 确认框
            $('body>[role="dialog"]').css({'left':(window.innerWidth/2-250)+'px','top':(height/2-35)+'px'});
        }
    };

    return Screen;
});
