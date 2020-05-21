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
    :src="url"
    v-on:click="$emit('image-click'); anime(); copy2Clipboard('copy_able');"
    >
  </v-img>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";
  import Favorite from "@/components/Favorite.vue";
  //import { writeClipboardApi } from "@/common/Clipboard";

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
      // コピーしたい画像のElementを取得
      const el = <HTMLImageElement> document.getElementById(id)! 

      // ClipboardAPIは新しい機能のため、typescript環境だと型エラーが発生する。
      // それを避けるためにClipboardAPIを使う部分は生のjsに切り出し、インターフェースを使って型を付けて利用する。
      interface ClipboardApiWraper {
        writeClipboardApi(el: HTMLImageElement): any;
      }
      // tslint:disable-next-line:no-var-requires // Warning避け
      const clipboard = require('@/common/Clipboard') as ClipboardApiWraper;

      // 画像エレメントをClipboardAPIでクリップボードに書き込む
      const err = clipboard.writeClipboardApi(el)
      if ( err !== null ) { // 開発用コード
        console.log(err)
      }
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
