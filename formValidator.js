//====================================================================================================
// [插件名称] jQuery formValidator-简易版
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery formValidator表单验证插件，它是基于jQuery类库，实现了js脚本于页面的分离。本插件内置模拟placeholder效果，
// 调用方便，支持参数配置的思想，将错误提示信息放于输入框内，能比较完美的实现ajax请求。
//----------------------------------------------------------------------------------------------------
// [作者网名] webkackchen（阿飞）
// [邮    箱] webkackchen@163.com
// [QQ交流] 602071930
// [版 本 号] ver0.0.1
//====================================================================================================
(function($){
    $.FormValidator = function(){
        this.settings = {
            successFn:false,   //是否有成功的回调函数
            failureFn:false,   //是否有验证失败的回调函数
            repeatObj:false,    //是否是重复密码框
            isPassword:false,   //是否是密码框
            R_obj:false,        //欲重复密码框的实例化对象
            R_password:false,     //欲重复密码框的id
            focusFn:false,      //获取焦点时是否有要做的事情
            isIdCar:false       //是否是身份证号码验证框
        };
        this.objArrId = function (arr,a){//查找匹配对象的Id
            var objArrLength = arr.length;
            for(var i=0;i < objArrLength;i+=1){
                if(arr[i].name == a){
                    return i;
                }
            }
        }
    };
    $.FormValidator.prototype.init = function(controlOptions){
        controlOptions = controlOptions || {};
        $.extend(this.settings,controlOptions);
        var This = this;
        This.obj = $("#"+ This.settings.id),
            This.data_type = This.obj.attr("validation-type"),
            This.Index = This.objArrId(This.settings.objArr,This.data_type),
            This.repeatObjs,This.repeatObjsValue,
            This.reg = This.settings.objArr[This.Index].reg,
            This.text = This.settings.objArr[This.Index].text;

        This.obj.on("blur",function(){
            var _this = $(this);
            var objValue = _this.val();
            if( This.settings.repeatObj){
                This.repeatObjs = $("#"+This.settings.R_password);
                This.repeatObjsValue =  This.repeatObjs.val();
            }
            if("" == objValue || null == objValue){
                if(This.settings.isPassword){
                    _this.next().val("请输入"+This.settings.title).removeClass("form_error_prompt").attr("data-empty","true").show();
                    _this.hide();
                }else{
                    _this.attr("data-empty","true").val("请输入"+This.settings.title).removeClass("form_success_prompt").removeClass("input_focus");
                }
                This.pass = false;
                if(This.settings.failureFn){
                    This.settings.failureFn();
                }
            }else{
                if(This.settings.repeatObj){//重复密码框
                    if(This.settings.R_obj.pass && This.repeatObjsValue == objValue){
                        _this.next().removeClass("form_error_prompt").removeAttr("data-empty").hide();
                        _this.addClass("form_success_prompt").show();
                        This.pass = true;
                    }else{
                        _this.next().val(This.settings.objArr[ This.Index].text).addClass("form_error_prompt").removeAttr("data-empty").show();
                        _this.removeClass("form_success_prompt").hide();
                        This.pass = false;
                        if(This.settings.failureFn){
                            This.settings.failureFn();
                        }
                    }
                }else if(This.settings.isIdCar){//是否是身份证框
                    var isIdCarPass = This.idCardValidate(This.settings.id);
                    if(isIdCarPass){
                        _this.removeClass("form_error_prompt").addClass("form_success_prompt").removeAttr("data-empty");
                        This.pass = true;
                        if(This.settings.successFn){
                            This.settings.successFn();
                        }
                    }else{
                        _this.val(This.settings.objArr[ This.Index].text).removeClass("form_success_prompt").removeClass("input_focus").addClass("form_error_prompt").removeAttr("data-empty");
                        This.pass = false;
                        if(This.settings.failureFn){
                            This.settings.failureFn();
                        }
                    }
                }else{
                    if(RegExp(This.reg).test(objValue)){
                        _this.removeClass("form_error_prompt").addClass("form_success_prompt").removeAttr("data-empty");
                        This.pass = true;
                        if(This.settings.successFn){
                            This.settings.successFn();
                        }
                    }else{
                        if(This.settings.isPassword){
                            _this.next().val(This.settings.objArr[ This.Index].text).addClass("form_error_prompt").removeAttr("data-empty").show();
                            _this.removeClass("form_success_prompt").hide();
                        }else{
                            _this.val(This.settings.objArr[ This.Index].text).removeClass("form_success_prompt").removeClass("input_focus").addClass("form_error_prompt").removeAttr("data-empty");
                        }
                        This.pass = false;
                        if(This.settings.failureFn){
                            This.settings.failureFn();
                        }
                    }
                }
            }
        });
        This.obj.on("focus",function(){
            var _This = $(this);
            _This.addClass("input_focus").removeClass("form_success_prompt").removeClass("form_error_prompt");
            if(This.settings.focusFn){
                This.settings.focusFn();
            }
            if(This.settings.isPassword){
                _This.next().removeAttr("data-empty").removeClass("form_warning_prompt");
            }else{
                _This.removeAttr("data-empty").removeClass("form_warning_prompt");
            }
            if(!This.pass){
                _This.val("");
            }
        });

        /**
         * 身份证号码验证start
         */

        $.FormValidator.prototype.idCardValidate = function(idCard){   //身份证验证函数
            var arr_Prov = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",
                23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
                42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
                61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
            var  reg = /^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;  //15,18位身份证基本效验
            var  idCardNo = $("#"+idCard).val();  //拿到输入的身份证值
            //     检测输入位数是否符合
            if(reg.test(idCardNo) == true){     //验证位数
                //位数无误
                if(arr_Prov[parseInt(idCardNo.substr(0,2))] == null){   //验证身份证省份真伪
                    return false;
                }else{    //省份无误
                    //检测输入的身份证是属于哪种
                    if(idCardNo.length == 15){      //身份证为15位数的
                        return isIdCardNoBy15(idCardNo);
                    }else if(idCardNo.length == 18){
                        return isIdCardNoBy18(idCardNo);
                    }

                }
            }else{    //位数有误
                return false;
            }

            ////详细验证15位身份证
            function  isIdCardNoBy15(idCard15){
            //       验证身份证上的出生日期是否有误
                var  Birthday15 = idCard15.substr(6,2)+"-"+Number(idCard15.substr(8,2))+"-"+Number(idCard15.substr(10,2));  //提取证件上的出生日期，并转换成有效数字
                var date15 = new Date(Birthday15.replace(/-/g,"/"));
                if(date15 < new Date()){      //判断证件日期不能大于实际的当前日期
                    if(Birthday15 != (date15.getYear()+"-"+ (date15.getMonth()+1) + "-" + date15.getDate())){   //验证是否有这个日期(主要是验证平、润年2月29日)
                        return false;
                    }else{     //日期无误
                        return true
                    }
                }else{    //证件日期大于了当前日期，假！
                    return false;
                }
            }

            //详细验证18位身份证
            function  isIdCardNoBy18(idCard18){
                var  Wi =  [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];     //加权因子
                var  ValidateCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];    // 身份证验证位值.10代表X
                var arr_idCardNo  = 0;
                var valCodePosition = 0;
                var sum = 0;     // 声明加权求和变量
                arr_idCardNo = idCard18.split("");    //得到身份证数组
                var  Birthday18 = idCard18.substr(6,4)+"-"+Number(idCard18.substr(10,2))+"-"+Number(idCard18.substr(12,2));  //提取证件上的出生日期，并转换成有效数字
                var date18 = new Date(Birthday18.replace(/-/g,"/"));
                if(date18 < new Date()){   //判断证件日期不能大于实际的当前日期
                    if(Birthday18 != (date18.getFullYear()+"-"+ (date18.getMonth()+1) + "-" + date18.getDate())){   //验证是否有这个日期(主要是验证平、润年2月29日)
                        return false;
                    }else{     //日期无误
                        if(arr_idCardNo[17].toLowerCase() == "x"){
                            arr_idCardNo[17] = 10;    //将带有X的证件号的X转换成10，方便后面使用
                        }
                        for(var i = 0;i < 17 ; i += 1){
                            sum += Wi[i] * arr_idCardNo[i];  //加权求和
                        }
                        valCodePosition = sum % 11;
                        if( arr_idCardNo[17] == ValidateCode[valCodePosition]){   //判断证件最后一位验证码是否正确
                            return true;
                        }else{
                            return false;
                        }
                    }
                }else{    //证件日期大于了当前日期，假！
                    return false;
                }
            }
        }
    }
    $.placeHolder = {
        pwdPlaceHolder:function pwdPlaceHolder(pwdObjArr){//密码框的placeholder效果模拟
            for(var k=0;k<pwdObjArr.length;k++){
                (function(i){
                    var nextBrother = pwdObjArr[i].next("input");
                    nextBrother.focus(function(){
                        pwdObjArr[i].show().focus().css("color","#000000") ;
                        nextBrother.hide();
                    });
                })(k);
            }
        },
        txtPlaceHolder:function txtPlaceHolder(arrObj,arrText){//输入框placeHolder效果预载
            var lengths=arrText.length;
            for(var i=0;i<lengths;i+=1){
                $(arrObj[i]).val(arrText[i]) ;
            }
        },
        txtRecover:function txtRecover(arrObj,arrText){//文本框内容替换方法，参数一：文本框对象数组，参数二：欲填入的数据数组
            var arrLength = arrObj.length;
            if(arrObj.length != arrText.length){
                return;
            }
            for(var i=0; i<arrLength; i++){
                $(arrObj[i]).val(arrText[i]);
            }
        },
        pwdRecover:function pwdRecover(arrObj,arrText){//密码提示框内容替换方法，参数一：密码框对象数组，参数二：欲填入的数据数组
            var arrLength = arrObj.length;
            if(arrObj.length != arrText.length){
                return;
            }
            for(var i=0; i<arrLength; i++){
                $(arrObj[i]).next().val(arrText[i]).show().removeClass("form_error_prompt");
                $(arrObj[i]).hide().removeClass("form_success_prompt");
            }
        }
    }
})(jQuery);
