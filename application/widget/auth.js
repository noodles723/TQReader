define(['jquery'],function($){
    
    // redirection url hash
    var errorMap = {
        '403': 'nologin',
        '500': 'error'
    };

    //authenticate failed, redirect to the login page
    function failHandle(res) {
        var errorHash = errorMap[res.status] || 'error';
        //if(!noLogin){
            window.location.href = this.failRedict +'#'+ errorHash;
        //}
    }

    var Auth = {
        api: './server/auth/regist.php',
        failRedict: './index.html',
        succRedict: './main.html',

        /**
         * 注册函数
         *
         * @method regist
         * @param {String} formStr 注册表单字符串
         */
        regist: function(formStr) {
            console.log(formStr);
            $.ajax({
                type: 'POST', 
                url: this.api,
                dataType: 'json',
                data: formStr
            })
            .success($.proxy(function(res){
                //console.log(res);
                var log;
                //$('#reg-result').text('').attr('class','');
                $('#reg-result').addClass('alert');
                if (res.status === 'success') {
                    log = 'Regist successfal, please login.';
                    $('#reg-result').addClass('alert-success');
                } else if (res.status === 'duplicate') {
                    log = 'This email has already beed registed, please use another and try again.';
                    $('#reg-result').addClass('alert-block');
                } else {
                    log = 'Regist failed, please try again later.';
                    $('#reg-result').addClass('alert-error');
                }
                console.log(log);
                $('#reg-result').text(log);
                /*if(res.status === 'success') {
                    window.location.href = this.succRedict;
                } else {
                    console.log('Warning: regist: failed\n');
                    window.location.href = this.failRedict+'#failed';
                }*/
            },this))
            .fail($.proxy(function(res){
                console.log('Warning: regist: ajax failed\n');
                //failHandle.call(this,res);
            },this));
        }
    };

    return Auth;
});
