/**
 * Created by Administrator on 2018/3/5.
 */
  //区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
  });

//需求：能够把地址栏所有的参数封装成一个对象
function getSearch(key){
  //获取参数
  var search = location.search;

  //对参数列表进行解码
  search = decodeURI(search);

  //去掉？splice()
  //splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。

  //splice(2, 0, 'drum'); // 在索引为2的位置插入'drum'
  search = search.slice(1);

  //把字符串根据&切割成数组
  //split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。
  var arr = search.split('&');

  //遍历数组
  var obj = {};
  arr.forEach(function(e,i){
    var k = e.split('=')[0];
    var v = e.split('=')[1];

    obj[k] = v;
  })

  return obj[key];
}