/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
  //渲染二级分类列表以及分页
  var page = 1;
  var pageSize = 3;
  var render = function (){
    $.ajax({
      type:'GET',
      url:"/category/querySecondCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        $('tbody').html(template('tpl',info));

        //渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(event, originalEvent, type,p){
            page=p;
            render();
          }
        })
      }
    })
  }
  //打开页面首先渲染一次
  render();

  //点击打开模态框
  $('.btn_add').on('click',function(){
    $('#secondModal').modal('show');
  })
})