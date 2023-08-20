import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import CV from './views/cv'
import Project1 from './views/project-1'
import About from './views/about'
import Contact from './views/contact'
import './style.css'

Vue.use(Router)
Vue.use(Meta)
export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'CV',
      path: '/cv',
      component: CV,
    },
    {
      name: 'Project-1',
      path: '/project-1',
      component: Project1,
    },
    {
      name: 'About',
      path: '/',
      component: About,
    },
    {
      name: 'Contact',
      path: '/contact',
      component: Contact,
    },
  ],
})
