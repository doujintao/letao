/**
 * Created by Administrator on 2018/3/4.
 */
$(function(){
  //渲染二级分类列表以及分页
  var page = 1;
  var pageSize = 8;
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

  //点击打开模态框  加载一级分类的数据
  $('.btn_add').on('click',function(){
    $('#secondModal').modal('show');

    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:1000
      },
      success:function(info){
        //console.log(info);
        $('.dropdown-menu').html(template('tpl2',info));
      }
    });






  });

  $('.dropdown-menu').on('click','a',function(){
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    var text = $(this).text();
    $('.dropdown_text').text(text);
    //让校验通过
    //手动修改校验通过，因为隐藏的input框不能监听事件，所以插件不能修改状态，所以要手动修改
    $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  });

  //初始化图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //图片上传成功之后的回调函数
    done:function (e, data) {
      //通过data.result.picAddr可以获取到图片上传后的路径
      var pic = data.result.picAddr;
      $('.img_box img').attr('src',pic);

      //给hidden设置value，传递给后台
      $('[name="brandLogo"]').val(pic);

      $('form').data("bootstrapValidator").updateStatus('brandLogo','VALID');
    }
  });

  //表单校验功能
  $('form').bootstrapValidator({
    excluded:[],
    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类的名单'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传品牌的图片"
          }
        }
      },
    }
  })

  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:"/category/addSecondCategory",
      data:$('form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          //关闭模态框
          $('#secondModal').modal('hide');
          //重新渲染第一页
          page = 1;
          render();

          //重置样式
          $('form').data('bootstrapValidator').resetForm(true);
          //4. 重置下拉框组件和图片
          $('.dropdown_text').text("请输入一级分类");
          $('[name="categoryId"]').val();
          $(".img_box img").attr('src',"images/none.png");
          $('[name="brandLogo"]').val();
        }
      }
    })
  })
})