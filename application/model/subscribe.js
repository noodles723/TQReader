define(['jquery',
        'model/_mod',
        'widget/event',
        'widget/validate'
        ],function($,Model,Event,Validator){

/**
 * 订阅模型
 *
 * @class Model::Subscribe
 * @constructor
 * @extends Model
 *
 * @uses Event
 * @uses jQuery
 */
var Subscribe = (function(_super){
    __extends(Subscribe,_super);

    function Subscribe(){
        Subscribe.__super__.constructor.apply(this,arguments);

        /**
         * api请求方法名
         *
         * @property method
         * @type String
         */
        this.method = 'subscribe/subscribe.php';

       /**
        * 订阅的模块名
        *
        * @property moduleName
        * @type Strinng
        */
        this.moduleName = 'subscribe';

        /**
         * 帮助方法
         *
         * @property method
         * @type String
         */
        this.helpText = "e.g: googleblog.bolgspot.com or sky sports"; 

        /**
         * 初始化方法
         *
         * @method init
         */
        this.init = function(){
            var subscribeBtn = $('#lhn-add-subscription');

            subscribeBtn.hover(function(){
                subscribeBtn.addClass('jfk-button-hover');
            },function(){
                subscribeBtn.removeClass('jfk-button-hover');
            });

            subscribeBtn.click(function(){
                $('#quick-add-bubble-holder').toggle();
            });

            $('#quick-add-close').click(function(){
                $('#quick-add-bubble-holder').toggle();
            });
            $('#quick-add-btn').click(function(){
                $('#quick-add-form').submit();
            });
            
            // 表单提交事件
            $('#quick-add-form').submit($.proxy(function(evt){
                evt.preventDefault();
                var formStr = this.vldSubForm();
                if (formStr){
                    console.log(formStr);
                    $('#quick-add-bubble-holder').hide();
                    $('#quick-add-helptext').html(this.helpText);
                    $('#loading-area-container').removeClass('hidden');
                    this.fetch(formStr);
                }
                return false;
            },this));
        };

        /**
         * 验证订阅表单是否为空
         *
         * @method vldSubForm
         */
        this.vldSubForm = function(){
            var data = {};

            data.data = $('#quickadd').val();

            Validator.config = {
                data: 'isNonEmpty' 
            };

            Validator.validate(data);
            if(!Validator.hasErrors()){
                return 'feedUrl='+data.data;
            } else {
                $('#quick-add-helptext').html('Oops!! feedUrl cannot be empty');
                return false;
            }
        };

        /**
         * 订阅表单提交事件
         *
         * @event fetched.subscribe
         */
        Event.bind('fetched.subscribe',$.proxy(this.feedComplete,this));
    }

    Subscribe.prototype.feedComplete = function(res){
        if(res.status === 'success') {
            this.result = res;
        } else {
            //TODO 错误处理
        }

        $('#loading-area-container').addClass('hidden');
    };
    return Subscribe;
}(Model));
            
return Subscribe;
});
