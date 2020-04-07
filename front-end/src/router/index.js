import Vue from 'vue'
import VueRouter from 'vue-router'
import upload from '../views/upload.vue'
import download from '../views/download.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/upload',
    name: 'upload',
    component: upload
  },
  {
    path: '/download',
    name: 'download',
    component: download
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
