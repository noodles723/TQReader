define(['jquery',
        'widget/event'
        ],function($,Event){
        
var loadingEl = $('#loading-area-container');
console.log('loading');
function loadingStart() { 
    loadingEl.removeClass('hidden');
}

function loadingEnd(){
    loadingEl.addClass('hidden');
}
    
function loadingFailed(){

}

Event.bind('start-loading',loadingStart);
Event.bind('end-loading',loadingEnd);
Event.bind('failed-loading',loadingFailed);
});
