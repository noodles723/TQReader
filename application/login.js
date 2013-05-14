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
            //先验证一下
            var form = this.validateRegForm();
            if (form){
                Auth.regist(form);
            } 
            return false;
        },this));
        
        /**
         * 登录表单提交事件监听
         *
         * @event submit
         * @param {Object} EventObject
         */
        $('#loginform').submit($.proxy(function(evt){
            evt.preventDefault();
            $('#signIn').popover('destroy');
            var form = this.validateLoginForm();
            if (form){
                Auth.login(form);
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
        
        $('#Email').on('focus',function(){
            $('#signIn').popover('destroy');
            $('#Email').popover('destroy');
        });
        $('#Passwd').on('focus',function(){
            $('#signIn').popover('destroy');
            $('#Passwd').popover('destroy');
        });
        /**
         * 验证注册表单输入参数是否符合格式
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

        /**
         * 验证登录表单输入参数是否符合格式
         *
         * @method validateLoginForm
         */
        this.validateLoginForm = function(){
            var data = {};
            
            data.email = $('#Email').val();
            data.passwd = $('#Passwd').val();

            Validator.config = {
                email: 'isNonEmpty',
                passwd: 'isNonEmpty'
            };
           // debugger;
            Validator.validate(data);
            if(!Validator.hasErrors()){
                data.passwd = $.md5(data.passwd);
                $('#signIn').popover('hide');
                return 'Email='+data.email+'&Passwd='+data.passwd;
            } else {
                $('#signIn').popover('toggle');
                return false;
            }

        };
    }

    return Login;
})();

return Login;

});
