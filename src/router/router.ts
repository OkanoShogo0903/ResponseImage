import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/image/:genre',
      name: 'images',
      props: true,
      component: () => import('@/components/ImagePlace.vue'),
    },
    {
      path: '/upload',
      name: 'upload',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/UploadPlace.vue'),
    },
  ],
});
