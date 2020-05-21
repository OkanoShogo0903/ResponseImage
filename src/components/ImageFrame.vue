<template>
      <!--
      <v-img
        class="image"
        :src="url"
        :class="{ animation: is_anime }"
        v-on:click="$emit('image-click'); anime(); copy2Clipboard();"
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

  <v-img
    id="copy_able"
    class="image"
    :class="{ animation: is_anime }"
    src="@/assets/logo.png"
    v-on:click="$emit('image-click'); anime(); copy2Clipboard('copy_able');"
    v-on:load="onLoad"
    >
      <Favorite
        @fav-click="$emit('fav-click');"
        :is_fav="is_fav"
      />
  </v-img>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";
  import Favorite from "@/components/Favorite.vue";

  @Component({
    components: {
      Favorite,
    },
  })
  export default class ImageFrame extends Vue {
    @Prop()
    public url!: string;
    @Prop()
    public is_fav!: Boolean;
    @Prop()
    public is_copy?: Boolean;

    private image_element: HTMLImageElement = new Image();

    // Image Animation.
    private is_anime: Boolean = false;
    private wait_ms: number = 250;
    private interval: any = null;

    private fav(){
      this.is_fav = !this.is_fav
    }

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

    public copy2Clipboard(id: string) {
      // ClipboardAPIは新しい機能のため、typescript環境だと型エラーが発生する。
      // それを避けるためにClipboardAPIを使う部分は生のjsに切り出し、インターフェースを使って型を付けて利用する。
      
      // コピーしたい画像のElementを取得
      //var el: HTMLImageElement = <HTMLImageElement> document.getElementById(id)! 
      //console.log(el)
      var el: HTMLImageElement = this.image_element
        
      // 空のCanvas作成し、コピーしたい画像を貼り付ける
      var canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = el.naturalWidth;
      canvas.height = el.naturalHeight;
      canvas.getContext('2d')!.drawImage(el, 0, 0);

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
        // 
        console.log(err)
      }
      this.anime(); 
    }

    public onLoad(local_path: string){
      var img = new Image();
      img.src = local_path;

      var that: any = this
      img.addEventListener("load", function() {
        that.image_element = img
      }, false);
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
