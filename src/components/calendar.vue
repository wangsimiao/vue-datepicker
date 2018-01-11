<template>
  <div class="calendar">
    <head>
      <p v-text="currentYear+'年'+currentMonth + '月'" @click="openDatepicker()"></p>
    </head>
    <ul class="calendar-week">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="calendar-table">
        <ul v-for="trueWeekday in trueWeekdays[0]">
          <li v-for="trueday in trueWeekday" v-text="trueday">
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide class="calendar-table">
        <ul v-for="trueWeekday in trueWeekdays[1]">
          <li v-for="trueday in trueWeekday" v-text="trueday">
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide class="calendar-table">
        <ul v-for="trueWeekday in trueWeekdays[2]">
          <li v-for="trueday in trueWeekday" v-text="trueday">
          </li>
        </ul>
      </swiper-slide>
    </swiper>
    <new-picker></new-picker>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex'
  import newDatepicker from 'components/datepicker.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    name: 'calendar',
    components: {
      'new-picker': newDatepicker,
      'swiper': swiper,
      'swiper-slide': swiperSlide
    },
    data: function (){
      var vm = this
      return {
        weekslength: [6, 6, 6],
        monthstartWeek: [7, 7, 7],
        trueWeekdays: [
          [30]
        ],
        swiperOption: {
          // autoplay: true, // 可选选项，自动滑动
          init: false,
          initialSlide: 1,
          on: {
            slideNextTransitionEnd: function () {
              if (vm.currentMonth === 12) {
                vm.$store.commit('changeCurrentMonth', 1)
                vm.$store.commit('changeCurrentYear', vm.currentYear + 1)
              }else{
                vm.$store.commit('changeCurrentMonth', vm.currentMonth + 1)
              }
            },
            slidePrevTransitionEnd: function () {
              if (vm.currentMonth === 1) {
                vm.$store.commit('changeCurrentMonth', 12)
                vm.$store.commit('changeCurrentYear', vm.currentYear - 1)
              }else{
                vm.$store.commit('changeCurrentMonth', vm.currentMonth - 1)
              }
            }
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      currentWeek: function () {
        // 当前星期几
        return new Date().getDay();
      },
      currentDay: function () {
        // 当前星期几
        return new Date().getDate();
      },
      ...mapState({
        currentYear: state => state.currentYear,
        currentMonth: state => state.currentMonth,
        currentMonthlength: state => state.currentMonthlength,
        currentOpen: state => state.currentOpen
      })
    },
    watch: {
      currentYear: function () {
        this.threeMonth()
      },
      currentMonth: function () {
        // console.log(this.currentMonth);
        this.threeMonth()
      }
    },
    methods: {
      threeMonth: function () {
        console.log(this.currentMonth);
        if (this.currentMonth === 1) {
          this.weekslongthContainblank(this.currentYear - 1, 12) // 当前月份前一个月
        }else{
          this.weekslongthContainblank(this.currentYear, this.currentMonth - 1) // 当前月份
        }
        this.weekslongthContainblank(this.currentYear, this.currentMonth) // 当前月份
        if (this.currentMonth === 12) {
          this.weekslongthContainblank(this.currentYear + 1, 1) // 当前后月份
        }else{
          this.weekslongthContainblank(this.currentYear, this.currentMonth + 1) // 当前月份
        }
      },
      openDatepicker: function () {
        this.$store.commit('changeOpen', 1)
      },
      monthStartWeek: function (index, currentYear, currentMonth) {
        // 通过年份和月份计算每个月的起始星期几
        var vm = this
        vm.monthstartWeek[index] = new Date(currentYear, currentMonth - 1, 1).getDay()
        // vm.$set(vm.monthstartWeek, index, new Date(currentYear, currentMonth - 1, 1).getDay())
        console.log(currentYear);
        console.log(currentMonth);
        console.log(vm.monthstartWeek);
      },
      weekslongthContainblank: function (currentYear, currentMonth) {
        // 当前月份一共有几行（包含空格的）
        var vm = this;
        var index = 0;
        if (currentMonth === 12 && vm.currentMonth === 1) {
          index = 0
        }else if (currentMonth === 1 && vm.currentMonth === 12) {
          index = 2
        }else{
          index = currentMonth + 1 - vm.currentMonth
        }
        vm.monthStartWeek(index, currentYear, currentMonth);
        vm.weekslength[index] = Math.ceil((vm.monthstartWeek[index] + vm.currentMonthlength[index]) / 7)
        var weekdays = new Array(vm.weekslength[index] * 7);
        // 包括空格整个月份的日期转一维数组
        for (var i = 0; i < vm.weekslength[index] * 7; i++) {
          if (i >= vm.monthstartWeek[index] && i < vm.monthstartWeek[index] + vm.currentMonthlength[index]) {
            weekdays[i] = i - vm.monthstartWeek[index] + 1
          }else {
            weekdays[i] = ''
          }
        }

        // 一维数组转二维数组
        vm.trueWeekdays[index] = new Array(vm.weekslength[index])
        for (var m = 0; m < vm.weekslength[index]; m++) {
          vm.trueWeekdays[index][m] = weekdays.slice(m * 7, m * 7 + 7)
        }
        // console.log(vm.trueWeekdays);
        if (index === 2) {
          vm.$nextTick(function () {
            vm.swiper.init()
          })
        }
      }
    },
    mounted () {
      let vm = this;
      vm.threeMonth();
    }
  }
</script>
<style lang="less">
  @r: 16rem / 750;
  .calendar{
    .swiper-container{
      overflow: initial;
    }
    head{
      display: block;
      height: 44px;
      font-size: 20px;
    }
    .calendar-week{
      li{
        display: inline-block;
        float: left;
        width: 16/7rem;
      }
    }
    .calendar-table{
      clear: both;
      ul{
        height: 16/7rem;
        background: #eee;
        li{
          display: inline-block;
          float: left;
          width: 16/7rem;
          height: 16/7rem;
          line-height: 16/7rem;
          border: 0.5px solid #ccc;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
