/**
 * 描述: Swiperwangsm
 * 作者：王思邈
 * 时间：2017年1月
 */
(function(){
  var Swiperwangsm = function (params){
    var defaults = {
      swiperContainer: params.swiperContainer,
      swiperWrapper: params.swiperWrapper,
      // swiperSlide: params.swiperSlide,
      direction: params.direction || 1, //1是左右
      index: params.index || 0, //起始顺序
    };
    var slider = {
      //touch事件
      touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
      //slider对象
      slider: defaults.swiperContainer,
      events: {
        slider: this.slider,
        handleEvent: function (event) {
          var self = this; //this指events对象
          if (event.type == 'touchstart') {
            self.start(event);
          } else if (event.type == 'touchmove') {
            self.move(event);
          } else if (event.type == 'touchend') {
            self.end(event);
          }
        }
      },
      //滑动开始
      start: function (event) {
        var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        startPos = {x: touch.pageX, y: touch.pageY, time: +new Date}; //取第一个touch的坐标值
        isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
        this.slider.addEventListener('touchmove', this, false);
        this.slider.addEventListener('touchend', this, false);
      },
      move: function (event) {
        if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        movePos = {x: touch.pageX, y: touch.pageY, time: +new Date}; //取当前第一个touch的坐标值
        isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
        this.slider.addEventListener('touchmove', this, false);
        this.slider.addEventListener('touchend', this, false);
        if (defaults.direction) {
          defaults.swiperWrapper.transform('translate3d('+ defaults.swiperContainer.style.width +'px, 0px, 0px)')
        }
      },
      end: function (event) {
        var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        endPos = {x: touch.pageX, y: touch.pageY, time: +new Date}; //取当前第一个touch的坐标值
        isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
      },
      init: function () {
        if(this.touch){
          this.slider.addEventListener('touchstart', this.events, false)
        }
      }
    };
    slider.init()
  }
  module.exports = Swiperwangsm;
})()
