import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { RoutePropsFunction } from 'vue-router/types/router'

import {
  AppView
} from '@vuelog/front'

import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

function vuelogProps(routeType: string): RoutePropsFunction {
  return route => {
    const page: string = route.query && (Array.isArray(route.query.page) ? route.query.page[0] : route.query.page) || '1'
    return {
      ...route.params,
      pageNumber: parseInt(page),
      vuelogRouteType: routeType
    }
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: AppView,
    props: vuelogProps('main')
  },
  {
    path: '/post/:postId(.*)',
    name: 'Post',
    component: AppView,
    props: vuelogProps('post')
  },
  {
    path: '/tag/:tagName/posts/',
    name: 'TagPosts',
    component: AppView,
    props: vuelogProps('tagPosts')
  },
  {
    path: '/category/:categoryName/posts/',
    name: 'CategoryPosts',
    component: AppView,
    props: vuelogProps('categoryPosts')
  },
  {
    path: '/query/:encodedQueries/posts/',
    name: 'QueryPosts',
    component: AppView,
    props: vuelogProps('queryPosts')
  },
  {
    path: '/cstm/**',
    name: 'CustomView',
    component: MainView,
    props: vuelogProps('custom:default')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
