/**
 * Created by Administrator on 2018/3/5.
 */
$(function () {
  //轮播图部分初始化
  var mySwiper = new Swiper ('.swiper-container', {
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
})