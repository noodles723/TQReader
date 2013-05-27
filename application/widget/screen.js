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
            $('#scrollable-sections').css('height',(height-125)+'px');
            $('#viewer-entries-container').css('height',(height-68)+'px'); 
        }
    };

    return Screen;
});
