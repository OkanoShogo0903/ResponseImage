import Vue from 'vue';
import Router from 'vue-router';
import ImagePage from '@/pages/ImagePage.vue';
import UploadPage from '@/pages/UploadPage.vue';
import { getAllGenre, getAllCharactor } from '@/common/Api';
Vue.use(Router);

var character_list: string[] = getAllCharactor()
var genre_list: string[] = ["hoge"]

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
      props: (route) => ({
        candidate_charactor: getAllCharactor(),
        candidate_genre: genre_list,
      }) ,
      // propsでとりあえず値を渡して、親からそれを変更しても反映されない
    },
  ],
});
