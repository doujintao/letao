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


  //启用禁用用户
  //动态渲染的数据注册点击事件需要进行时间委托
  $('tbody').off().on('click',".btn",function(){
    //显示模态框
    $('#userModal').modal('show');

    //获取到点击的按钮所在的用户的id
    var id = $(this).parent().data('id');

    var isDelete = $(this).hasClass('btn-success')?1:0;

    console.log(id,isDelete);
    $('.btn_confirm').on('click',function(){
      //点击确定发送ajax请求，修改数据，重新渲染
      $.ajax({
        type:'POST',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          if(info.success){
            $('#userModal').modal('hide');

            render();
          }
        }
      })
    })

  })

});