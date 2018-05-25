import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainView from '@/views/MainView'
import Books from '@/views/books'
import CartList from '@/views/cartList'
import SearchList from '@/views/SearchList'
import BookList from '@/components/BookList'
import Address from '@/views/address'
import Closing from '@/views/closing'
import Adminindex from '@/views/adminindex'
import Adminalllist from '@/views/adminalllist'
import Adminissend from '@/views/adminisend'
import Adminnosend from '@/views/adminnosend'
import Adminalluser from '@/views/adminalluser'
import AdminLogin from '@/views/adminLogin'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/booklist',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/cartlist',
      name: 'CartList',
      component: CartList
    },
    {
      path: '/searchlist',
      name: 'SearchList',
      component: SearchList
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      name: 'Closing',
      path: '/closing',
      component: Closing
    },
    {
      name: 'AdminLogin',
      path: '/adminLogin',
      component: AdminLogin
    },

    {
      path: '/admin',
      component: Adminindex,
      children: [
        {
          path: '/',
          component: Adminalllist
        },
        {
          path: '/adminnosend',
          component: Adminnosend
        },
        {
          path: '/adminissend',
          component: Adminissend
        },
        {
          path: '/adminalluser',
          component: Adminalluser
        },

      ]
    },

  ]
})
