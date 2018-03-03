$(function (){
  //1、校验表单
  $('form').bootstrapValidator({
    //配置校验规则
    fields: {
      //fields中对应了form表单中的name属性
      username:{
        //给username配置校验规则
        validators: {
          notEmpty: {
            message:"用户名不能为空"
          },
          stringLength:{
            min:4,
            max:12,
            message:"用户名长度应该为4-12位"
          },
          callback: {
            message:"用户名错误"
          }
        }
      },
      password: {
        validators:{
          notEmpty: {
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度应该为6-12位"
          },
          callback: {
            message:'密码错误'
          }
        }
      }
    },
    //配置小图标, 成功 失败  校验中
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }

  });

  //2. 给表单注册一个校验成功的事件， 成功的时候阻止表单的默认提交，使用ajax进行。
  $('form').on("success.form.bv",function(e){
    //阻止浏览器默认行为  preventDefault()是组织浏览器默认事件行为的方法
    e.preventDefault();
    console.log("hhh");

  //发送ajax请求登录
    $.ajax({
      type:'post',
      url:"/employee/employeeLogin",
      datatype:'json',
      data:$('form').serialize(),  //表单序列化的方法
      success:function(info){
        console.log(info);
        if(info.error === 1000){
          $('form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }

        if(info.error === 1001) {
          $('form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }

        if(info.success){
          location.href = "index.html";
        }
      }
    })

  })


  //3. 重置表单， 清除所有的样式

  $('[type="reset"]').on('click',function(){
    $('form').data('bootstrapValidator').resetForm(true);
  })
});