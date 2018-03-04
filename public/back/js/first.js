/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
  //渲染列表与分页
  var page = 1;
  var pageSize = 3;
  function render(){
    $.ajax({
      type:'GET',
      url:'/category/queryTopCategoryPaging',
      data:{
        page : page,
        pageSize : pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('tpl',info));

        //渲染分页
        $("#paginator").bootstrapPaginator({
          //默认是2，如果是bootstrap3版本，这个参数必填
          bootstrapMajorVersion:3,
          //当前页
          currentPage:page,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(event, originalEvent, type,p){
            page = p;
            render();
          }
        });
      }
    })
  }

  render();

  //添加分类
  $('.btn_add').on('click',function(){
    $('#firstModal').modal('show');
  })


  //初始化表单校验
  var $form = $('form');
  $form.bootstrapValidator({
    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"输入的内容不能为空"
          }
        }
      }
    }
  })


  //给表单注册校验成功的事件
  $form.on('success.form.bv',function(e){
    //阻止浏览器的默认事件
    e.preventDefault();
    $.ajax({
      type:'POST',
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          //关闭模态框
          $('#firstModal').modal('hide');

          //重置表单的样式和内容
          $form.data('bootstrapValidator').resetForm(true);

          //重新渲染第一页
          page = 1;
          render();
        }
      }
    })
  })
})