import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import aboutcolor from '../components/aboutcolor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: home,
    children: [
      {
        path: ':colorname',
        name: '颜色详情',
        component: aboutcolor,
        props: true
      },
      {
        path: '',
        component: aboutcolor
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.push('/')
//router.push('/aboutcolor')
export default router
