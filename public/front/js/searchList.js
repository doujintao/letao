$(function(){

  var page = 1;
  var pageSize = 4;
  //封装发送ajax请求
  function render(callback){

    //定义一个对象，存放需要传递给后台的值
    var obj= {};
    obj.page = page;
    obj.pageSize = pageSize;
    obj.proName = $('.lt_search input').val();

    //处理参数price和num，如果lt_sort有now这个类，就传入后台进行排序，否则不传
    var $now = $('.lt_sort a.now');
    if($now.length > 0 ){
      //sortName 是代表获取到定义的data-type值
      var sortName = $now.data('type');
      //sortValue 是判断是否有下箭头这个属性，如果有就降序排列，没有就升序
      var sortValue = $now.find('span').hasClass('fa-angle-down')?2:1;
      //是将sortName的值作为键，sortValue的值作为值添加到obj对象中
      obj[sortName] = sortValue;
    }else {
      console.log("不需要传递排序参数");
    }
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:obj,
      success:function(info){
        setTimeout(function () {
          //把渲染的操作放到callback中
          callback(info);
        }, 1000);
      }
    })
  }

  //功能一：页面一进来，需要渲染一次， proName来自于input框
  //1.获取到搜索框中的数据
  var key = getSearch("key");
  //2.放到搜索框中
  $('.lt_search input').val(key);

  //配置上拉刷新和下拉加载
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",
      down : {
        auto:true,
        callback :function(){
          page = 1;
          //3.发送ajax渲染页面
          render(function(info){
            console.log(info);
            $('.product').html(template('tpl',info));
            //数据渲染完成，需要关闭下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            //重置上拉加载
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
          });
        }
      },
      up : {
        callback :function(){
          page++;
          render(function(info){
            if(info.data.length > 0){
              $('.product').append(template('tpl',info));
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
            }else {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }

          });
        }
      },
    }
  });

  //功能二：点击搜索按钮，需要渲染一次， 用户修改了proName
  //1.点击搜索按钮，根据值重新渲染数据
  $('.lt_search button').on('tap',function(){
    //点击搜索按钮之后，不能直接就给鞋子排序，所以要先移除排序按钮上的now属性,并且要给span去除箭头向上的像是，给span加上向下的箭头样式
    $('.lt_sort a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    //重新渲染数据
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    //把此次的搜索记录存储到搜索页面
    //1.首先将数据存储到localStorage中
    var value = $('.lt_search input').val();
    //JSON.parse是将字符串的数组转换为正规的数组样式
    //localStorage.getItem从本地缓存中取到数据
    // 数据类型为'["阿迪", "阿迪达斯"]'
    // JSON.parse转换之后的数据类型为 ["阿迪", "阿迪达斯"]
    var arr = JSON.parse(localStorage.getItem('list') || '[]');
    //判断数据中是否已经存有输入框内的数据，如果有删除，如果没有添加到第一位

    //indexOf（）是判断字符串中是否有（）内的数据，如果没有就返回-1，如果有就返回数据首次出现的位置
    var index = arr.indexOf(value);
    if(index != -1) {
      arr.splice(index,1);
    };
    if(arr.length >= 10) {
      arr.pop();
    };
    if(index == -1) {
      //在最开始加入value值
      arr.unshift(value);
    };
    //然后将数据添加到本地缓存
    localStorage.getItem('list',JSON.stringify(arr));
  })

  //功能三：点击排序的时候，需要渲染一次（需要传递更多的参数）
  //1. 给lt_sort下的有data-type属性的a注册点击事件
  $('.lt_sort a[data-type]').on('tap',function(){
    var $this = $(this);
    if($this.hasClass('now')){
      //toggleClass（）代表某元素有某各类就移除，没有某各类就添加
      $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }else{
      $this.addClass('now').siblings().removeClass('now');
      //刚添加now这个属性时，所有的箭头都向下，
      $('.lt_sort span').removeClass('fa-angle-up').add('fa-angle-down');
    }

    //重新渲染数据
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })

});