<template>
  <div>
    <FooterEffect ref="footer"> Copy ! </FooterEffect>
    <v-container>
      <v-row>
        <v-col v-for="url in urls" cols="4">
          <ImageFrame
            :url="url"
            :is_fav="false"
            :is_copy="true"
            @image-click="$refs.footer.anime();"
            @fav-click="favClicked();"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import {getImageUrl, getAllImageUrl ,getAllGenre } from '@/common/Api';
  import {Component, Prop, Watch, Vue} from "vue-property-decorator";
  import ImageFrame from "@/components/ImageFrame.vue";
  import FooterEffect from "@/components/FooterEffect.vue";

  @Component({
    components: {
      ImageFrame,
      FooterEffect,
    },
  })
  export default class ImagePlace extends Vue {
    // TODO: URLではなく、レスポンシブをそのままjsonバインドしたImageオブジェクトをPropで受け渡すことにする
    private urls: string[] = new Array();
    private selected_img: any;

    @Prop()
    public genre?: ( string | null );

    // 画像のロード関連
    // TODO: ページ遷移時に画像をリクエストしているが、これはSPAとして正しいのか?
    @Watch('genre')
    onRouterChanged(to: string, from: string) {
      if (to !== from) {
        this.updatePage(this.genre)
      }
    }

    created(){
      this.updatePage(this.genre)
    }

    private favClicked(){
      // TODO: FavのAPI実装
      // サーバサイドの簡略化のため、boolの反転ではなくsetにした
      // フロントで取り敢えず属性を変えて、遅れてサーバに反映
      // api.setFavorite(img[x].id, !this.is_fav) 
    }

    private updatePage(g: (string | null | undefined) ){
      if ( g === "all" || g === null || g === undefined ){
        this.urls = getAllImageUrl()
      }
      else{
        this.urls = getImageUrl(g)
      }
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
