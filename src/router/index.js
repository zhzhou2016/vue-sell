import Vue from 'vue'
import Router from 'vue-router'
// import VueResource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(Router);

// Router.push('/ratings');
export default new Router({
  routes: [
    {
      path: '/',
      // name: 'goods',
      component: ratings
    },
    {
      path: '/goods',
      // name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      // name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      // name: 'seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
})

