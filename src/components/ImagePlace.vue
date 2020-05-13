<template>
  <div>
    <FooterEffect v-if="f_is_anime"> Copy ! </FooterEffect>
    <v-container>
      <v-row>
        <v-col v-for="url in urls" cols="4">
          <ImageFrame
            :url="url"
            :is_fav="true"
            :is_copy="true"
            @parentMethod="clicked"
            :class="{ animation: a_is_anime }"
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
    private urls: string[] = new Array();
    private selected_img: any;

    // Footer Animation.
    private f_is_anime: Boolean = false;
    private f_wait_ms: number = 1500;
    private f_interval: any = null;

    // Image Animation.
    private a_is_anime: Boolean = false;
    private a_wait_ms: number = 250;
    private a_interval: any = null;


    @Prop()
    public genre?: ( string | null );

    // 画像のロード関連
    // TODO: ページ遷移時に画像をリクエストしているが、これはSPAとして正しいのか?
    @Watch('genre')
    onRouterChanged(to: string, from: string) {
      console.log("Watch")
      if (to !== from) {
        this.updatePage(this.genre)
      }
    }
    created(){
      this.updatePage(this.genre)
    }
    private updatePage(g: (string | null | undefined) ){
      if ( g === "all" || g === null || g === undefined ){
        this.urls = getAllImageUrl()
      }
      else{
        this.urls = getImageUrl(g)
      }
    }

    // イベントの伝播
    clicked(){
      console.log("clicked!!!")
      this.footerAnime()
      this.imageAnime()
    }
    // TODO: ゴミ。ポインタをくれ。たのむ。
    public footerAnime(){
      if (this.f_is_anime === true || this.f_interval !== null) {
        return
      }
      this.f_is_anime = true
      this.f_interval = setInterval(() => {
        this.f_is_anime = false
        clearInterval(this.f_interval)
        this.f_interval = null
      }, this.f_wait_ms)
    }
    public imageAnime(){
      if (this.a_is_anime === true || this.a_interval !== null) {
        return
      }
      this.a_is_anime = true
      this.a_interval = setInterval(() => {
        this.a_is_anime = false
        clearInterval(this.a_interval)
        this.a_interval = null
      }, a_wait_ms)
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
