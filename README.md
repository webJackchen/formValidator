
// [插件名称] jQuery formValidator-简易版
// [描    述] jQuery formValidator表单验证插件，它是基于jQuery类库，实现了js脚本于页面的分离。本插件内置模拟placeholde
//  效果，调用方便，采用参数配置的思想，将错误提示信息放于输入框内。内置身份证号码验证规则，更改样式较方便灵活。
// [作者网名] webkackchen（阿飞）
// [邮    箱] webkackchen@163.com
// [QQ交流] 602071930
// [版 本 号] ver0.0.1

html-------------------

<form id="form">
    <div>
        <input type="text" id="R_userPhone" data-empty="true" validation-type="电话号码" data-type="text"/>
    </div>
    <div>
        <input type="text" id="R_verifyCode" data-empty="true" validation-type="短信验证码" data-type="text" />
    </div>
    <div>
        <input type="text" id="card" data-empty="true" validation-type="身份证号码" data-type="text" />
    </div>
    <div>
        <input id="R_password" validation-type="密码" type="password" class="disNone" oncopy = "return false" onpaste="return false" />
        <input type="text" data-empty="true" value="请创建密码"/>
    </div>
    <div>
        <input id="R_repeatPassword" validation-type="重复密码" type="password" class="disNone" oncopy = "return false" onpaste="return false" />
        <input value="请确认密码" data-empty="true" type="text"/>
    </div>
    <div>
        <input id="R_pay" validation-type="密码" type="password" class="disNone" oncopy = "return false" onpaste="return false" />
        <input type="text" data-empty="true" value="请创建密码"/>
    </div>
    <div>
        <input id="R_repeatpay" validation-type="重复密码" type="password" class="disNone" oncopy = "return false" onpaste="return false" />
        <input value="请确认密码" data-empty="true" type="text"/>
    </div>
    <div>
        <input type="button" id="R_submit" value="确认注册" class="btn"/>
    </div>
</form>

其中自定义属性解释：
data-empty：对象是否无值，默认为true；验证成功后该属性自动移除
data-type：是否是type：text   类型
validation-type：验证规则采用类型


js调用部分------------------------------
<script type="text/javascript" src="jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="formValidator.js"></script>
<script type="text/javascript">
    var textInputArr = $("input[data-type ='text']"),InputArr = ["请输入手机号码","请输入验证码","请输入身份证号码"];
    var objArr=[
        {name:"电话号码",reg:"^(1)[0-9]{10}$",text:"您输入的手机号码有误"},
        {name:"短信验证码",reg:"^[\\d]{1,6}$",text:"验证码不正确"},
        {name:"密码",reg:"^[\\w]{6,16}$",text:"密码由6到16位的字母和数字组成"},
        {name:"身份证号码",reg:"^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$",text:"请输入有效的身份证号码"},
        {name:"重复密码",reg:"^[\\w]{6,16}$",text:"您两次输入的密码不一致"}
    ];
    $.placeHolder.txtPlaceHolder(textInputArr,InputArr);//文本框初始化数据
    $.placeHolder.pwdPlaceHolder([$("#R_password"),$("#R_repeatPassword"),$("#R_pay"),$("#R_repeatpay")]);//密码框初始化数据


    var d1 = new $.FormValidator();
    d1.init({//必配参数：id-验证对象的id    title：验证对象的名称      objArr-里面包含（验证类型，验证规则，错误提示）
        id:"R_userPhone",
        title:"电话号码",
        objArr:objArr,
        successFn:function(){alert("d1.pass" + d1.pass);},
        failureFn:function(){alert("验证失败的回调，失败时触发。。。")}
    })
    var d2 = new $.FormValidator();
    d2.init({
        id:"R_verifyCode",
        title:"短信验证码",
        objArr:objArr
    })

    var d3 = new $.FormValidator();
    d3.init({
        id:"R_password",
        title:"登录密码",
        objArr:objArr,
        isPassword:true
    })
    var d4 = new $.FormValidator();
    d4.init({
        id:"R_repeatPassword",
        title:"重复登录密码",
        objArr:objArr,
        isPassword:true,
        repeatObj:true,
        R_password:"R_password",
        R_obj:d3,
        successFn:function(){alert(8888);}
    })



    var d5 = new $.FormValidator();
    d5.init({
        id:"R_pay",
        title:"支付密码",
        objArr:objArr,
        isPassword:true
    })
    var d6 = new $.FormValidator();
    d6.init({
        id:"R_repeatpay",
        title:"重复支付密码",
        objArr:objArr,
        isPassword:true,
        repeatObj:true,
        R_password:"R_pay",
        R_obj:d5,
        successFn:function(){alert(8888);}
    })


    var d7 = new $.FormValidator();
    d7.init({
        id:"card",
        title:"身份证号",
        objArr:objArr,
        isIdCar:true
    })
    
    验证通过后对应的对象pass属性为true；
    提交数据时通过判断对应的表单对象的pass属性
    
    
    $("#R_submit").click(function(){
        $("input[data-empty = 'true']").addClass("form_warning_prompt");
        if(d1.pass && d2.pass && d3.pass && d4.pass && d5.pass && d6.pass && d7.pass){
          $("#form").submit();
        }
    })

    具体效果请看demo
