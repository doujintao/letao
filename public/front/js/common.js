/**
 * Created by Administrator on 2018/3/5.
 */
  //区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
  });


$(function () {
  //轮播图部分初始化
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 1000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination'
    }
  })
});


//需求：能够把地址栏所有的参数封装成一个对象
function getSearch(key) {

  //1. 获取到参数
  var search = location.search;

  //2. 对参数列表进行解码
  search = decodeURI(search);

  //3. 去掉?
  search = search.slice(1);

  //4. 把字符串根据&切割成数组
  var arr = search.split('&');

  //5. 遍历数组
 var obj = {};
  arr.forEach(function(e,i){
    var k = e.split('=')[0];
    var v = e.split('=')[1];

    obj[k] = v;
  })

  return obj[key];
}