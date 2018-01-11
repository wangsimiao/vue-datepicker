<template>
  <div class="swiper-container" ref="swiperContainer">
    <ul class="swiper-wrapper" ref="swiperWrapper">
      <li class="slide-active">
        <img src="https://kano.guahao.cn/ARK19531691?resize=750-336" alt="">
      </li>
      <li>
        <img src="https://kano.guahao.cn/ARK19531691?resize=750-336" alt="">
      </li>
      <li>
        <img src="https://kano.guahao.cn/ARK19531691?resize=750-336" alt="">
      </li>
      <li>
        <img src="https://kano.guahao.cn/ARK19531691?resize=750-336" alt="">
      </li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  import Swiperwangsm from 'assets/jsdev/plugins/swiper.js'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      swiper () {
        var vm = this
        var swiper00 = new Swiperwangsm({
          swiperContainer: vm.$refs.swiperContainer,
          swiperWrapper: vm.$refs.swiperContainer
          // swiperSlide: params.swiperSlide,
        })
        swiper00()
      }
    },
    mounted () {
      var vm = this
      vm.swiper()
    }
  }
</script>
<style lang="less">
  @r: 16rem / 750;
  .swiper{
    width: 750 * @r;
    overflow: hidden;
    ul{
      width: 10000px;
      li{
        float: left;
        width: 750 * @r;
        img{
          display: inline-block;
          width: 700 * @r;
        }
      }
    }
  }
</style>
