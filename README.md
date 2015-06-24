
#### [插件名称] jQuery formValidator-简易版
####[描    述] jQuery formValidator表单验证插件，它是基于jQuery类库，实现了js脚本于页面的分离。本插件内置模拟placeholde效果，调用方便，采用参数配置的思想，将错误提示信息放于输入框内。内置身份证号码验证规则，更改样式较方便灵活。
####[作者网名] webjackchen（阿飞）
####[邮    箱] webjackchen@163.com
####[github 地址]https://github.com/webJackchen/formValidator
####[QQ交流] 602071930
#####[版 本 号] ver0.0.1

######html

&lt;form&nbsp;id="form"&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type="text"&nbsp;id="R_userPhone"&nbsp;data-empty="true"&nbsp;validation-type="电话号码"&nbsp;data-type="text"/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type="text"&nbsp;id="R_verifyCode"&nbsp;data-empty="true"&nbsp;validation-type="短信验证码"&nbsp;data-type="text"&nbsp;/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type="text"&nbsp;id="card"&nbsp;data-empty="true"&nbsp;validation-type="身份证号码"&nbsp;data-type="text"&nbsp;/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;id="R_password"&nbsp;validation-type="密码"&nbsp;type="password"&nbsp;class="disNone"&nbsp;oncopy&nbsp;=&nbsp;"return&nbsp;false"&nbsp;onpaste="return&nbsp;false"&nbsp;/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type="text"&nbsp;data-empty="true"&nbsp;value="请创建密码"/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;id="R_repeatPassword"&nbsp;validation-type="重复密码"&nbsp;type="password"&nbsp;class="disNone"&nbsp;oncopy&nbsp;=&nbsp;"return&nbsp;false"&nbsp;onpaste="return&nbsp;false"&nbsp;/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;value="请确认密码"&nbsp;data-empty="true"&nbsp;type="text"/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;id="R_pay"&nbsp;validation-type="密码"&nbsp;type="password"&nbsp;class="disNone"&nbsp;oncopy&nbsp;=&nbsp;"return&nbsp;false"&nbsp;onpaste="return&nbsp;false"&nbsp;/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type="text"&nbsp;data-empty="true"&nbsp;value="请创建密码"/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;id="R_repeatpay"&nbsp;validation-type="重复密码"&nbsp;type="password"&nbsp;class="disNone"&nbsp;oncopy&nbsp;=&nbsp;"return&nbsp;false"&nbsp;onpaste="return&nbsp;false"&nbsp;/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;value="请确认密码"&nbsp;data-empty="true"&nbsp;type="text"/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input&nbsp;type="button"&nbsp;id="R_submit"&nbsp;value="确认注册"&nbsp;class="btn"/&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</br>
&lt;/form&gt;</br>

#####其中自定义属性解释：
data-empty：对象是否无值，默认为true；验证成功后该属性自动移除</br>
data-type：是否是type：text&nbsp;&nbsp;&nbsp;类型</br>
validation-type：验证规则采用类型</br>


js调用部分
&lt;script&nbsp;type="text/javascript"&nbsp;src="jquery-1.8.2.min.js"&gt;&lt;/script&gt;</br>
&lt;script&nbsp;type="text/javascript"&nbsp;src="formValidator.js"&gt;&lt;/script&gt;</br>
&lt;script&nbsp;type="text/javascript"&gt;</br>
&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;textInputArr&nbsp;=&nbsp;$("input[data-type&nbsp;='text']"),InputArr&nbsp;=&nbsp;["请输入手机号码","请输入验证码","请输入身份证号码"];</br>
&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;objArr=[</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:"电话号码",reg:"^(1)[0-9]{10}$",text:"您输入的手机号码有误"},</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:"短信验证码",reg:"^[\\d]{1,6}$",text:"验证码不正确"},</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:"密码",reg:"^[\\w]{6,16}$",text:"密码由6到16位的字母和数字组成"},</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:"身份证号码",reg:"^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$",text:"请输入有效的身份证号码"},</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name:"重复密码",reg:"^[\\w]{6,16}$",text:"您两次输入的密码不一致"}</br>
&nbsp;&nbsp;&nbsp;&nbsp;];</br>
&nbsp;&nbsp;&nbsp;&nbsp;$.placeHolder.txtPlaceHolder(textInputArr,InputArr);//文本框初始化数据</br>
&nbsp;&nbsp;&nbsp;&nbsp;$.placeHolder.pwdPlaceHolder([$("#R_password"),$("#R_repeatPassword"),$("#R_pay"),$("#R_repeatpay")]);//密码框初始化数据</br>


&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d1&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d1.init({//必配参数：id-验证对象的id&nbsp;&nbsp;&nbsp;&nbsp;title：验证对象的名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr-里面包含（验证类型，验证规则，错误提示）</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"R_userPhone",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"电话号码",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;successFn:function(){alert("d1.pass"&nbsp;+&nbsp;d1.pass);},</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;failureFn:function(){alert("验证失败的回调，失败时触发。。。")}</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>
&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d2&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d2.init({</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"R_verifyCode",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"短信验证码",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>

&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d3&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d3.init({</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"R_password",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"登录密码",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isPassword:true</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>
&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d4&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d4.init({</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"R_repeatPassword",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"重复登录密码",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isPassword:true,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repeatObj:true,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R_password:"R_password",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R_obj:d3,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;successFn:function(){alert(8888);}</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>



&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d5&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d5.init({</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"R_pay",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"支付密码",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isPassword:true</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>
&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d6&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d6.init({</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"R_repeatpay",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"重复支付密码",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isPassword:true,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repeatObj:true,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R_password:"R_pay",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R_obj:d5,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;successFn:function(){alert(8888);}</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>


&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;d7&nbsp;=&nbsp;new&nbsp;$.FormValidator();</br>
&nbsp;&nbsp;&nbsp;&nbsp;d7.init({</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:"card",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title:"身份证号",</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objArr:objArr,</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isIdCar:true</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>
&nbsp;&nbsp;&nbsp;&nbsp;</br>
&nbsp;&nbsp;&nbsp;&nbsp;验证通过后对应的对象pass属性为true；</br>
&nbsp;&nbsp;&nbsp;&nbsp;提交数据时通过判断对应的表单对象的pass属性</br>
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;$("#R_submit").click(function(){</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$("input[data-empty&nbsp;=&nbsp;'true']").addClass("form_warning_prompt");</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(d1.pass&nbsp;&&&nbsp;d2.pass&nbsp;&&&nbsp;d3.pass&nbsp;&&&nbsp;d4.pass&nbsp;&&&nbsp;d5.pass&nbsp;&&&nbsp;d6.pass&nbsp;&&&nbsp;d7.pass){</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$("#form").submit();</br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</br>
&nbsp;&nbsp;&nbsp;&nbsp;})</br>

######&nbsp;&nbsp;    具体效果请看demo
