/**
 * Created by Administrator on 2018/3/4.
 */
$(function () {
    //发送ajax请求，获取数据，渲染到页面
  var page = 1;
  var pageSize = 5;

  //因为切换页面时要重新渲染页面，所以将渲染页面的方法封装，方便调用
  function render(){
    $.ajax({
      type:'GET',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('tbody').html(template('tpl',info));

        //渲染分页，基于返回的数据来渲染数据

        //初始化分页插件，并且传入参数
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          numberOfPages:3,
          currentPage:page,
          onPageClicked:function(a,b,c,p){
            //修改page的值，重新渲染页面
            page = p;
            render();
          }
        })
      }
    })
  }

  //打开页面需要首先渲染一次
  render();

});