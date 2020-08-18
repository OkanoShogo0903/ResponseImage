<template>
  <!--
  <v-img
    class="image"
    :src="url"
    :class="{ animation: is_anime }"
    v-on:click="$emit('image-click'); anime(); onClick();"
  > 
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-row>
    </template>
    
    <Favorite
      @fav-click="$emit('fav-click');"
      :is_fav="is_fav"
    />
  </v-img>
  -->

  <v-content>
    <img
      id="copy_able"
      class="image"
      :class="{ animation: is_anime }"
      :src=image.url
      v-on:click="$emit('image-click'); anime(); onClick(`copy_able`)"
    />

    <Favorite
      @fav-click="$emit('fav-click'); favClicked();"
      :is_fav=image.is_fav
    />
  </v-content>
</template>

<script lang="ts">
  import { putFav } from '@/common/Api';
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";
  import Favorite from "@/components/Favorite.vue";

  @Component({
    components: {
      Favorite,
    },
  })
  export default class ImageFrame extends Vue {
    @Prop()
    public image!: any;

    // Image Animation.
    private is_anime: Boolean = false;
    private wait_ms: number = 250;
    private interval: any = null;

    public anime(){
      if (this.is_anime === true || this.interval !== null) {
        return
      }
      this.is_anime = true
      this.interval = setInterval(() => {
        this.is_anime = false
        clearInterval(this.interval)
        this.interval = null
      }, this.wait_ms)
    }

    public favClicked(){
      console.log(this.image)
      // TODO: FavのAPI実装 (中間テーブルとか必要)
      // サーバサイドの簡略化のため、boolの反転ではなくputにしている
      // フロントで取り敢えず属性を変えて、遅れてサーバに反映する形
      putFav(this.image.id, !this.image.is_fav).then(res => console.log("put fav : " + res))
      this.image.is_fav = !this.image.is_fav
    }

    /*
    public created(){
      this.image_element = <HTMLImageElement> document.get
      const el = <HTMLImageElement> document.getElementById(id)! 

      console.log(this.image_element)
    }

    */
    public onClick(el_id:string){
      const el = <HTMLImageElement> document.getElementById(el_id)! 
      this.image2Clipboard( el );
    }

    private image2Clipboard(image: HTMLImageElement) {
      // 空のCanvas作成し、コピーしたい画像を貼り付ける
      var canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d')!.drawImage(image, 0, 0);

      // ClipboardAPIは新しい機能のため、typescript環境だと型エラーが発生する。
      // それを避けるためにClipboardAPIを使う部分は生のjsに切り出し、インターフェースを使って型を付けて利用する。
      interface ClipboardApiWraper {
        writeClipboardApi(canvas: HTMLCanvasElement): any;
      }
      // tslint:disable-next-line:no-var-requires // Warning避け
      const clipboard = require('@/common/Clipboard') as ClipboardApiWraper;

      const err = clipboard.writeClipboardApi(canvas)
      if ( err === null ) {
        // TODO: ページ下部のアニメーションのテキスト変更
      }
      else{
        // TODO: 
        console.log(err)
      }
      this.anime(); 
    }

  }
</script>

<style scoped>
.image {
  width:100%; height:100%;
  background-color: #fff;
  box-shadow: 0 0 20px #444;
}
.animation {
  animation-direction: normal;
  animation-duration: 0.2s;
  animation-name: bound;
  animation-timing-function: none;
  transform: scale(1, 1);
}
@keyframes bound {
  50%  { transform: scale(0.9, 0.9); }
  100% { transform: scale(1, 1); }
}
</style>
