define([],function(){
/**
 * 输入验证器
 *
 * @class Validator
 */
var Validator = {
   /**
    * 所有具体检查方法对象
    *
    * @property types
    */
   types: {
       /**
        * 检查是否为空
        *
        * @method isNonEmpty
        * @param {String} value 需要被认证的字符串
        */
       isNonEmpty: {
           validate: function(value){
               return value !== "";
           },
           instructions: " cannot be empty"
       },
       /**
        * 检查是否是数字
        *
        * @method isNumber
        * @param {String} value 需要被检查的字符串
        */
       isNumber: {
           validate: function(value){
               return !isNaN(value);
           },
           instructions: " can only be a valid number, e.g: 1,3.14 or 2013"
       },
       /**
        * 检查是否是字母和数字
        *
        * @method is AlphaNum
        * @param {String} value 需要被检查的字符串
        */
       isAlphaNum: {
           validate: function (value){
               return !/[^a-z0-9]/i.test(value);
           },
           instructions: " can only contain characters and numbers, no special symbols"
       }
   },

   /**
    * 检查配置，起链接作用
    *
    * @property config
    */
   config: {},

   /**
    * 存储错误消息
    *
    * @property message
    */
   message:[],

   /**
    * 接口方法
    *
    * @method
    * @param {Object} data
    */
   validate: function(data){
        var i, msg, type, checker, result_ok;
        //重置所有消息
        this.message = [];

        for(i in data) {
            if(data.hasOwnProperty(i)){
                type = this.config[i];
                checker = this.types[type];
           
                if(!type) {
                    continue; //不需要验证
                }
                if (!checker){
                    throw {
                        name: "validationError",
                        message: "No handler to validate type "+type
                    };
                }

                result_ok = checker.validate(data[i]);
                if(!result_ok){
                    msg = i+checker.instructions;
                    this.message.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    //帮助程序
    hasErrors: function(){
        return this.message.length !== 0;
    } 
        
};

return Validator;
});
