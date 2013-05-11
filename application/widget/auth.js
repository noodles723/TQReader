define(['jquery'],function($){
    
    // redirection url hash
    var errorMap = {
        '403': 'nologin',
        '500': 'error'
    };

    //authenticate failed, redirect to the login page
    function failHandle(res) {
        var errorHash = errorMap[res.status] || 'error';
        if(!noLogin)
    }
});
