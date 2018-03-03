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
    }, 3000);
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
  })

  //退出功能
  $(".icon_logout").on("click", function () {
    //显示模态框
    $("#logoutModal").modal("show");

  });

})