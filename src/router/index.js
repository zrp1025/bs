import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainView from '@/views/MainView'
import Books from '@/views/books'
import CartList from '@/views/cartList'
import SearchList from '@/views/SearchList'
import BookList from '@/components/BookList'
import Address from '@/views/address'
import Adminindex from '@/views/adminindex'

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
      path: '/admin',
      name: 'Adminindex',
      component: Adminindex
    },

  ]
})
