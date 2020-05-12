import Vue from 'vue';
import Router from 'vue-router';
import ImagePlace from '@/components/ImagePlace.vue';
import UploadPlace from '@/components/UploadPlace.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/',
      name: 'top',
      props: {genre: null},
      component: ImagePlace,
    },
    {
      path: '/image/:genre',
      name: 'image',
      props: true,
      component: ImagePlace,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadPlace ,
    },
  ],
});
