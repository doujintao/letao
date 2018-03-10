$(function(){
  //功能一：渲染商品数据
  //1. 获取到地址栏中productId
  var productId = getSearch('productId');
  console.log(productId);
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:productId
    },
    success:function(info){
      //给对象info添加一个数组，在尺码方面可以设置
      var tempArr = info.size.split('-');
      var arr = [];
      for (var i = +tempArr[0]; i <= tempArr[1];i++){
        arr.push(i);
      }
      info.sizeArr = arr;

      console.log(info);
      $('.mui-scroll').html(template('tpl',info));
      //重新初始化轮播图
      var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      });

      //重新初始化numbox
      mui(".mui-numbox").numbox();

      //可以选择尺码
      $('.size span').on('click',function(){
        console.log(11);
        $(this).addClass('now').siblings().removeClass('now');
      })
    }
  });


  //功能二：加入购物车
  //1. 给按钮注册点击事件
  //2. 获取productId, num, size ,发送ajax请求

  $('.btn_add_cart').on('click',function(){
    //产品尺码
    var size = $('.size span.now').text();
    //产品数量
    var num = $('mui-numbox-input').val();

    if(!size) {
      mui.toast('请选择鞋子尺码');
      return;
    }

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:productId,
        size:size,
        num:num
      },
      success:function(info){
        //加入购物车需要登录
        if(info.error){
          //跳转到登录页面， ,并且把当前页给传递过去(为了在登录之后能拿到数据，再跳转到此页面)。
          location.href = "login.html?retUrl="+location.href;
        }

        if(info.success) {
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
            if(e.index == 0){
              location.href = "cart.html";
            }
          })
        }
      }
    })
  })
});
