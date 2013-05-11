//login page
define(['app/_page',
        'widget/auth.js',
        'widget/validate.js'
        ],function(Page,Auth,Validate){
/**
 * login class
 *
 * @class Page::Login
 * @constructor
 * @extends Page
 */
var Login = (function(_super){
    __extends(Login, _super);
    
    function Login(){
        Login.__super__.constructor.apply(this, arguments);

        /**
         * signup form submit event
         *
         * @event submit
         * @param {Object} EventObject
         */
        $('#signupform').submit(function(evt){
            evt.preventDefault();
            Auth.regist($(this).serialize());
            return false;
        });
    }
})(Page);

return Login;

});
