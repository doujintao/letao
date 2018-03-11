/**
 * Created by Administrator on 2018/3/10.
 */
$(function(){
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    success:function(info){
      console.log(info);
      if(info.error){
        location.href = "login.html";
      }
      $('.userinfo').html(template('tpl',info));
    }
  });

  $('.btn_logout').on('click',function(){
    console.log(11);
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(info){
        //跳转到登录页
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
})
