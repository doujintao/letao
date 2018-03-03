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

  })
});