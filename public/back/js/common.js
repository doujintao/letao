$(function(){

  //NProgress  进度条js
  //禁用进度环
  NProgress.configure({
    showSpinner: false
  })


  $(document).ajaxStart(function () {
    //进度条加载效果
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });

  //首页导航菜单js
  //二级菜单的显示与隐藏
  //思路： 找到二级分类的a标签
  //prev()获取元素紧邻的前一个同胞元素
  $('.second').prev().on('click',function(){
    //slideToggle() 方法通过使用滑动效果（高度变化）来切换元素的可见状态
    $(this).next().slideToggle();
  })

  //首页menu缩进事件
  //找到icon_menu注册点击事件
  $(".icon_menu").on("click",function(){
    //让侧边栏隐藏
    $('.lt_aside').toggleClass("now");
    //让main的padding-left:0
    $('.lt_main').toggleClass("now");
    $('.lt_header').toggleClass("now");
    $('.lt_content').toggleClass("now");
    $('.container-fluid ol').toggleClass("now");
  })

  //退出功能
  $(".icon_logout").on("click", function () {
    //显示模态框
    $("#logoutModal").modal("show");
  });
  //不要在事件里面注册事件
  $(".btn_logout").on("click", function () {
  //需要告诉服务器，我需要退出，  让服务器把对应的session销毁
    $.ajax({
      type:'GET',
      url:'/employee/employeeLogout',
      success:function (info) {
        if(info.success) {
          //退出成功，才跳转到登录页
          location.href = "login.html";
        }
      }
    })
  });


  //如果不是登录页，发送ajax请求，查询管理员是否登录
  //indexOf()返回字符串中是否有括号内的字符串，如果没有返回数值-1，，如果有返回字符串所在的位置
  if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"GET",
      url:"/employee/checkRootLogin",
      success:function (info) {
        //console.log(info);
        //判断，info.error是否是400
        if(info.error === 400) {
          location.href = "login.html";
        }
      }
    })
  }
});