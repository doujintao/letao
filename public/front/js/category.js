/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info);
      $('.first').html(template('fristTpl',info));

      //首先点开页面渲染第一个数据的页面
      render(info.rows[0].id);
    }
  });

  //2. 点击一级菜单，重新渲染二级菜单
  //动态渲染的数据要事件委托
  $('.first').on('click','li',function(){
    //点击之后now的值要根据id移动
    $(this).addClass('now').siblings().removeClass('now');
    //点击每个li,获取所点击的li的id
    var id = $(this).data('id');
    //根据id渲染页面
    render(id);
    //scroll()后边的[1]是因为此处有两个区域滚动的盒子，
    // mui('.mui-scroll-wrapper').scroll()返回值为一个数组，数组为这两个盒子组成，
    //所以这个为选出第二个盒子让其区域滚动重新到0，0的位置
    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,200);
  });

//二级菜单渲染模板的封装
  function render(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);

        $('.second').html(template('secondTpl',info));
      }
    })
  }
});