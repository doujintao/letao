/**
 * Created by Administrator on 2018/3/10.
 */
$(function(){

  $('.btn_login').on('click',function(){
    console.log(111);
    var username = $("[name=username]").val();
    var password = $("[name=password]").val();
    if(!username) {
      mui.toast('请输入用户名')
    }
    if(!password) {
      mui.toast('请输入密码')
    }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success:function(info){
        if(info.error){
          mui.toast(info.message);
        }
        if(info.success){
          if(location.search.indexOf('retUrl') != -1){
            history.go(-1);
          }else{
            location.href = 'user.html';
          }
        }
      }
    })
  })
})
