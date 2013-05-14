//login page
define(['application/widget/auth.js',
        'application/widget/validate.js',
        'application/widget/event.js',
        'application/widget/md5.js'
        ],function(Auth,Validator,Event){
/**
 * login class
 *
 * @class Page::Login
 * @constructor
 * @extends Page
 */
var Login = (function(){
    //__extends(Login, _super);
    
    function Login(){
        //Login.__super__.constructor.apply(this, arguments);

        /**
         * signup form submit event
         *
         * @event submit
         * @param {Object} EventObject
         */
        $('#signupform').submit($.proxy(function(evt){
            evt.preventDefault();
            //var form = $(this).serialize().split('&');
            //form[2] = 'passwd='+$.md5(form[2]);
            //console.log(form);
            //Auth.regist(form.join('&'));
            var form = this.validateRegForm();
            if (form){
                Auth.regist(form);
            } else {
            
            }
            return false;
        },this));
        
        /**
         * 添加关闭注册框事件监听
         *
         * @event hidden
         */
        $('#reg-box').on('hidden',function(){
            $('#userName').attr('value','');
            $('#regEmail').attr('value','');
            $('#passwd').attr('value','');
            $('#reg-result').text('').attr('class','');
        });

        /**
         * 验证输入参数是否符合格式
         *
         * @method validateRegForm
         */
        this.validateRegForm = function(){
            var formData = {};

            $('#reg-result').text('').attr('class','');
            formData.name = $('#userName').val();
            formData.email = $('#regEmail').val();
            formData.passwd = $('#passwd').val();

            Validator.config = {
                name: 'isNonEmpty',
                email: 'isNonEmpty',
                passwd: 'isNonEmpty'
            };

            Validator.validate(formData);
            if (!Validator.hasErrors()) {
                formData.passwd = $.md5(formData.passwd);
                return 'userName='+formData.name+'&regEmail='+formData.email+'&passwd='+formData.passwd;
            } else {
                console.log('validate error:\n'+Validator.message.join('\n')); 
                $('#reg-result').append(Validator.message.join('</br>')).attr('class','alert alert-error');
                return false;
            }
        };
    }

    return Login;
})();

return Login;

});
