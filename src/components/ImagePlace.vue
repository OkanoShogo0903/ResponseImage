<template>
  <v-container fluid>

    {{ selected_genre }}

    <v-row>
      <v-col v-for="url in urls" cols="4">
        <ImageFrame :url="url" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
  import {getImageUrl, getAllImageUrl ,getAllGenre } from '@/common/Api';
  import {Component, Watch, Vue} from "vue-property-decorator";
  import ImageFrame from "@/components/ImageFrame.vue";

  @Component({
    components: {
      ImageFrame,
    },
  })
  export default class ImagePlace extends Vue {
    private urls: string[] = new Array();

    public selected_genre: ( string | null ) = null

    // ページ遷移時に画像をリクエストしているが、これはSPAとして正しいのか?
    @Watch('$route.params') // 読み込んでないと分からない書き方なので、ライフサイクルのページ遷移をフックして読み込むとかにした方が良さそう。もしくはvue-routerのprop?
    onTextChanged(new_selected_genre: string, old: string) {
      this.urls = getImageUrl(new_selected_genre)
    }

    public created(){
      this.urls = getAllImageUrl()
    }
  }
</script>


<style scoped>
body {
    margin: 0;
}
.place {
  position: relative;

  width: 100%; height: 450px;
  margin: 50px;

  background-color: #fff;
  border: solid 10px #444;
}
</style>
