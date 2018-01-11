<template>
  <div id="sw-wrapper" ref="swwrapper">
    <div id="sw-header">
      <div id="sw-cancel" @click="cancel">
        取消
      </div>
      <div id="sw-done" @click="done">
        确定
      </div>
    </div>
    <div id="sw-slots-wrapper">
      <div id="sw-slots" ref="swslots">
        <div class="sw-center" id="sw-center-year" ref="swcenteryears">
          <ul>
            <li :id="'year' + years" v-for="years in years.yearsArray" v-text="years"></li>
          </ul>
        </div>
        <div class="sw-center" id="sw-center-month" ref="swcentermonths">
          <ul>
            <li :id="'month' + months" v-for="months in monthsArray" v-text="months"></li>
          </ul>
        </div>
        <div class="sw-center" id="sw-center-day" ref="swcenterdays">
          <ul>
            <li :id="'day' + days" v-for="days in daysArray" v-text="days"></li>
          </ul>
        </div>
      </div>
    </div>
    <div id="sw-frame">

    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex'
  import 'assets/less/spinningwheel.less'
  export default {
    props: {
      option: {
        type: Object,
        default () {
          return {
            start: 2000,
            end: 2020
          }
        }
      }
    },
    data () {
      return {
        years: {
          start: this.option.start,
          end: this.option.end,
          length: this.option.end - this.option.start + 1,
          yearsArray: []
        },
        monthsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        daysArray: [],
        topDelta: '',
        currentDay: new Date().getDay()
      }
    },
    computed: {
      ...mapState({
        currentYear: state => state.currentYear,
        currentMonth: state => state.currentMonth,
        currentOpen: state => state.currentOpen
      }),
      currentMonthlength: function () {
        // 通过年份计算每个月的天数  当前月份天数
        let vm = this
        let leapyear = vm.currentYear % 100 === 0 ? (vm.currentYear % 400 === 0 ? 1 : 0) : (vm.currentYear % 4 === 0 ? 1 : 0);
        return [31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][vm.currentMonth - 1]; // 建立一个数组放每个月的天数
      }
    },
    watch: {
      currentOpen(val){
        if (val) {
          this.open()
        }else{
          this.done()
        }
      }
    },
    methods: {
      default: function () {
        let vm = this
        let year = document.getElementById("sw-center-year")
        let month = document.getElementById("sw-center-month")
        let day = document.getElementById("sw-center-day")
        vm.slideTo(year, vm.currentYear - vm.years.start)
        vm.slideTo(month, vm.currentMonth - 1)
        vm.slideTo(day, vm.currentDay - 1)
        year.children[0].children[vm.currentYear - vm.years.start].className = 'select'
        month.children[0].children[vm.currentMonth - 1].className = 'select'
        day.children[0].children[vm.currentDay - 1].className = 'select'
      },
      formtoYear: function () {
        // 从哪年到哪年的数组
        var vm = this
        vm.years.yearsArray = new Array(this.option.end - this.option.start + 1)
        for (var m = 0; m < vm.years.length; m++) {
          vm.years.yearsArray[m] = vm.years.start + m
        }
        vm.formtoMonth()
      },
      formtoMonth: function () {
        // 某月 哪天到哪天的数组
        var vm = this
        vm.daysArray = new Array(vm.currentMonthlength)
        for (var m = 0; m < vm.currentMonthlength; m++) {
          vm.daysArray[m] = m + 1
        }
      },
      vuetouchstart: function (e) {
        // 从上一次位置开始滑
        var a = e.currentTarget.style.webkitTransform.replace(/translate3d\((.*)+, (.*)+, (.*)+\)/i, "$2")
        if (a) {
          this.startY = e.targetTouches[0].clientY - parseInt(e.currentTarget.style.webkitTransform.replace(/translate3d\((.*)+, (.*)+, (.*)+\)/i, "$2"));
        }else{
          this.startY = e.targetTouches[0].clientY
        }
        e.currentTarget.addEventListener('touchmove', this.vuetouchmove, false);
        e.currentTarget.addEventListener('touchend', this.vuetouchend, false);
      },
      vuetouchmove: function (e) {
        var vm = this
        vm.topDelta = e.targetTouches[0].clientY - this.startY;
        if (Math.abs(vm.topDelta) >= Math.abs((e.currentTarget.children[0].childElementCount - 1) * 44)) {
          vm.topDelta = -(e.currentTarget.children[0].childElementCount - 1) * 44 // 控制不要滑动超出范围
        }else if (vm.topDelta >= 0) {
          vm.topDelta = 0 // 控制不要滑动超出范围
        }
        vm.topDelta = Math.floor(vm.topDelta / 44) * 44 // 精准定位
        e.currentTarget.style.webkitTransform = 'translate3d(0, ' + vm.topDelta + 'px, 0)';
        e.currentTarget.addEventListener('touchend', this.vuetouchend, false);
      },
      vuetouchend: function (e) {
        let distance = Math.abs(Math.floor(this.topDelta / 44))
        for (var i = 0; i < e.currentTarget.children[0].childElementCount; i++) {
          if ((i === distance) && (e.currentTarget.children[0].children[i].className.indexOf('select') === -1)) {
            e.currentTarget.children[0].children[i].className += 'select'
          }else{
            e.currentTarget.children[0].children[i].className = e.currentTarget.children[0].children[i].className.replace(/select/g, '')
          }
        }
        if (e.currentTarget.attributes['id'].nodeValue === 'sw-center-year') {
          // this.currentYear = this.years.start + distance
          this.$store.commit('changeCurrentYear', this.years.start + distance)
          this.formtoMonth() // 根据年月份刷新天数
        }else if (e.currentTarget.attributes['id'].nodeValue === 'sw-center-month') {
          // this.currentMonth = distance + 1
          this.$store.commit('changeCurrentMonth', distance + 1)
          this.formtoMonth()
        }else if (e.currentTarget.attributes['id'].nodeValue === 'sw-center-day') {
          this.currentDay = distance + 1
        }
        e.currentTarget.addEventListener('touchmove', this, false);
        e.currentTarget.addEventListener('touchend', this, false);
      },
      slideTo: function (e, distance) {
        e.style.webkitTransform = 'translate3d(0, ' + -distance * 44 + 'px, 0)';
      },
      cancel: function () {
        this.$refs.swwrapper.style.webkitTransitionTimingFunction = 'ease-in';
        this.$refs.swwrapper.style.webkitTransitionDuration = '400ms';
        this.$refs.swwrapper.style.webkitTransform = 'translate3d(0, 260px, 0)';
        this.$store.commit('changeOpen', 0)
      },
      done: function () {
        this.cancel()
      },
      open: function () {
        this.$refs.swwrapper.style.webkitTransitionTimingFunction = 'ease-in';
        this.$refs.swwrapper.style.webkitTransitionDuration = '400ms';
        this.$refs.swwrapper.style.webkitTransform = 'translate3d(0, 0, 0)';
        this.default()
      }
    },
    mounted () {
      let vm = this;
      vm.$nextTick(function () {
        vm.formtoYear() // 从哪年到哪年的数组
      })
      vm.$refs.swcenteryears.addEventListener('touchstart', vm.vuetouchstart, false);
      vm.$refs.swcenteryears.addEventListener('touchmove', vm.vuetouchmove, false);
      vm.$refs.swcentermonths.addEventListener('touchstart', vm.vuetouchstart, false);
      vm.$refs.swcentermonths.addEventListener('touchmove', vm.vuetouchmove, false);
      vm.$refs.swcenterdays.addEventListener('touchstart', vm.vuetouchstart, false);
      vm.$refs.swcenterdays.addEventListener('touchmove', vm.vuetouchmove, false);
    }
  }
</script>
