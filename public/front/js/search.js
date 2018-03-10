/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){
  //约定存入本地缓存的数据的键为list

  //功能1：从本地缓存中取出数据，渲染到页面上
  //1.取数据
  function getArr(){
    //从本地缓存取到的数据为数组,数组中的内容为字符串形式
    var history = localStorage.getItem('list') || '[]';
    //将数组中的字符串形式转换为数组形式
    var arr = JSON.parse(history);
    return arr;
  };
  //渲染数据
  function render(){
    var arr = getArr();
    //结合模板引擎渲染数据
    $('.lt_history').html(template('tpl',{info:arr}));
  };
  render();
  //功能2： 增加
  //1. 给搜索按钮注册事件
  $('.lt_search button').on('click',function(){
    //2. 获取到文本框value值
    var txt = $('.lt_search input').val().trim();
    $('.lt_search input').val("");
    if(txt == ""){
      mui.toast('请输入搜索关键字');
      return;
    };
    //3. 获取到存储数据的数组
    var arr = getArr();

    //需求1：数组长度不能过10

    //获取txt是否存在在数组中，如果不存在，就直接添加，如果存在，先干掉，再添加
    var index  = arr.indexOf(txt);
    if(index != -1){
      arr.splice(index,1);
    }
    //需求2：如果这个搜索关键字已经存在，需要删除掉
    if(arr.length>=10){
      arr.pop();
    }
    //4. 把value值添加到数组中的最前面
    arr.unshift(txt);
    //5. 重新设置search_list的值
    localStorage.setItem('list',JSON.stringify(arr));
    //6. 重新渲染 （跳转到搜索详情页）
    location.href = "searchList.html?key="+txt;
  });

  //功能3：清空
  //1. 给清空按钮注册点击事件(委托)
  $('.lt_history').on('click','.btn_empty',function(){
    mui.confirm('你确定要清空历史记录吗？','温馨提示',['否','是'],function(e){
      if(e.index===1){
        //2. 清空 search_list 这个值
        localStorage.removeItem('list');
        //3. 重新渲染
        render();
      }
    })
  });

  //功能4：删除
  //1. 给删除按钮注册点击事件
  $('.lt_history').on('click','.btn_delete',function(){
    var that = $(this)
    mui.confirm('你确定要清空历史记录吗？','温馨提示',['否','是'],function(e){
      console.log(e);
      //e.index===0是代表点击了“否”字，
      //e.index===1是代表点击了“是”字
      if(e.index===1){
        //2. 获取到删除的下标
        var index = $(that).data('index');
        console.log(index);
      //3. 获取到web存储中的数组
        var arr = getArr();
        //4. 删除数组中对应下标那项
        arr.splice(index,1);
        //5. 重新设置search_list的值
        localStorage.setItem('list',JSON.stringify(arr));
        //6. 重新渲染。
        render();
      }
    })
  });






















});