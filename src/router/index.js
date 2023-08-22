import Vue from 'vue'
import VueRouter from 'vue-router'
import NewHome from '../views/NewHome.vue'
import License from '../views/License.vue'
import Blank from '../views/Blank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/',
    category: 'hidden'
  },
  {
    path: '/',
    name: 'Ready Set Dice',
    component: NewHome,
    icon: 'mdi-home',
    category: 'head',
  },
  {
    path: '/pc',
    name: 'Players',
    miniName: 'PC',
    bold: true,
    component: Blank,
    category: 'tool',
    beforeEnter() {location.href = 'https://pc.readysetdice.com/'}
  },
  {
    path: '/#div1',
    type: 'divider',
  },
  {
    path: '/gm',
    name: 'Game Masters',
    miniName: 'GM',
    bold: true,
    component: Blank,
    category: 'tool',
    beforeEnter() {location.href = 'https://gm.readysetdice.com/'}
  },
  {
    path: '/blog',
    name: 'Blog (Patreon)',
    component: Blank,
    icon: 'mdi-patreon',
    category: 'foot',
    beforeEnter() {location.href = 'https://www.patreon.com/readysetdice'}
  },
  {
    path: '/discord',
    name: 'Join the Discord',
    component: Blank,
    icon: 'mdi-discord',
    category: 'foot',
    beforeEnter() {location.href = 'https://discord.gg/9gdTrgeY3X'}
  },
  {
    path: '/license',
    name: 'License',
    component: License,
    icon: 'mdi-license',
    category: 'foot',
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
