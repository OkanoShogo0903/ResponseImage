import Vue from 'vue';
import Router from 'vue-router';
import ImagePage from '@/pages/ImagePage.vue';
import UploadPage from '@/pages/UploadPage.vue';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/',
      name: 'top',
      props: {genre: null},
      component: ImagePage,
    },
    {
      path: '/image/:genre',
      name: 'image',
      props: true,
      component: ImagePage,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage ,
    },
  ],
});
