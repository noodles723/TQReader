define(['jquery',
        'widget/event'
        ],function($,Event){
/**
 * feedlist 控制器
 *
 * @class Controller::view-list
 * @constructor
 *
 * @uses jQuery
 * @uses Event
 */
var ListC = (function(){

    function ListC(){
        
        this.listEl = $('#sub-tree-item-0-main>ul');

        this.init = function(){};

        Event.bind('show-new-list-item',this.proxy(this.showNewItem));
    }
    
    ListC.prototype.proxy = function(fn){
        return $.proxy(fn, this);
    };

    ListC.prototype.showNewItem = function(item){
        console.log('show new item');
        var html = '<li class="sub unselectable expanded unread tree-selected" id="sub-tree-item-'+item.rssId+'-main">'+
                        '<div class="toggle sub-toggle toggle-d-'+item.level+' hidden"></div>'+
                        '<a class="link tree-link-selected" href="#" id="sub-tree-item-'+item.rssId+'-link">'+
                            '<div class="icon sub-icon icon-d-'+item.level+' favicon" id="sub-tree-item-"'+item.rssId+'-icon></div>'+
                            '<div class="name-text sub-name-text name-text-d-'+item.level+' name sub-name name-d-'+item.level+' name-unread" id="sub-tree-item-'+item.rssId+'-name">'+item.title+'</div>'+
                            '<div class="unread-count sub-unread-count unread-count-d-'+item.level+'" id="sub-tree-item-'+item.rssId+'-unread-count">('+item.unread+')</div>'+
                        '</a>'+
                    '</li>';

        $(html).appendTo(this.listEl);

    };

    return ListC;
}());

return ListC;
});
