/**
 * Created by Administrator on 2018/3/11.
 */
$(function () {
  //获取验证
  //1. 给获取验证码注册点击事件（禁用默认行为）
  //2. 禁用掉用按钮，并且把内容改成 发送中...
  //2. 发送ajax请求

  $('.btn_getCode').on('click', function (e) {
    //禁用浏览器默认样式
    e.preventDefault();
    var $this = $(this);
    //disabled  禁用input提交功能
    $this.prop('disabled', true).addClass('disabled').text("发送中...");

    $.ajax({
      type: 'get',
      url: '/user/vCode',
      success: function (info) {
        console.log(info);
        var cound = 5;
        //开启定时器
        var timer = setInterval(function () {
          cound--;
          //修改text的内容
          $this.text(cound + "秒后再次发送");
          if (cound <= 0) {
            //需要清除定时器
            clearInterval(timer);
            //恢复按钮
            $this.prop('disabled', false).removeClass('disabled').text('再次发送');
          }
        }, 1000);
      }
    })
  });

  //点击注册功能
  $('.btn_register').on('click', function (e) {
    e.preventDefault();

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[id='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();

    if (!username) {
      mui.toast('用户名不能为空！');
      return;
    }
    ;
    if (!password) {
      mui.toast('密码不能为空！');
      return;
    }
    ;
    if (repassword != password) {
      mui.toast('密码不一致！');
      return;
    }
    ;
    if (!mobile) {
      mui.toast('手机号不能为空！');
      return;
    }
    ;
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      mui.toast('手机号格式不正确！');
      return;
    }
    if (!vCode) {
      mui.toast('验证码不能为空！');
      return;
    }
    ;
    //校验通过
    $.ajax({
      type: 'post',
      url: '/user/register',
      data: $("form").serialize(),
      success: function (info) {
        if(info.error){
          mui.toast(info.message);
        }
        if(info.success){
          mui.toast('恭喜你，注册成功了，2秒后自动跳转到登录页');
          setInterval(function(){
            location.href = 'login.html';
          },2000);
        }
      }
    })


  })
});