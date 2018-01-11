import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    currentMonthlength: [30, 30, 30],
    currentOpen: 0
  },
  mutations: {
    changeCurrentYear(state, currentYear) {
      state.currentYear = currentYear
      let leapyear = state.currentYear % 100 === 0 ? (state.currentYear % 400 === 0 ? 1 : 0) : (state.currentYear % 4 === 0 ? 1 : 0);
      state.currentMonthlength.splice(0, 3)
      state.currentMonthlength.push([31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][(state.currentMonth - 1) % 11]); // 建立一个数组放每个月的天数
      state.currentMonthlength.push([31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][state.currentMonth % 11]); // 建立一个数组放每个月的天数
      state.currentMonthlength.push([31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][(state.currentMonth + 1) % 11]); // 建立一个数组放每个月的天数
    },
    changeCurrentMonth(state, currentMonth) {
      state.currentMonth = currentMonth
      state.currentMonthlength.splice(0, 3)
      let leapyear = state.currentYear % 100 === 0 ? (state.currentYear % 400 === 0 ? 1 : 0) : (state.currentYear % 4 === 0 ? 1 : 0);
      state.currentMonthlength.push([31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][(state.currentMonth - 1) % 11]); // 建立一个数组放每个月的天数
      state.currentMonthlength.push([31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][state.currentMonth % 11]); // 建立一个数组放每个月的天数
      state.currentMonthlength.push([31, 28 + leapyear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][(state.currentMonth + 1) % 11]); // 建立一个数组放每个月的天数
    },
    changeOpen(state, currentOpen) {
      state.currentOpen = currentOpen
    }
  }
})
