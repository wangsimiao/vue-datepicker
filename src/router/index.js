import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Swiper from '@/components/swiper'
import Calendar from '@/components/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: Swiper
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    }
  ]
})
