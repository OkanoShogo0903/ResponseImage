<template>
  <div>
      <!--
      <v-img
        class="image"
        :src="url"
        :class="{ animation: is_anime }"
        v-on:click="$emit('image-click'); anime(); copy();"
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

      <img
        id="copy_able"
        class="image"
        :class="{ animation: is_anime }"
        src="@/assets/logo.png"
        v-on:click="$emit('image-click'); anime(); copy('copy_able');"
        >
      </img>

      <p>
        <canvas id="test_canvas" width=256 height=256 style="border: 1px solid;"></canvas>
      </p>
    </div>
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

    public copy(id: string) {
      var el: Element = document.getElementById(id)!
      
      // 空のCanvas作成
      var canvas: Element = document.createElement('canvas');
      canvas.width = el.naturalWidth;
      canvas.height = el.naturalHeight;

      // Canvasにコピーしたい画像を貼り付ける
      canvas.getContext('2d').drawImage(el, 0, 0);

      // CanvasをBlobに変換してクリップボードに貼り付け
      canvas.toBlob(blob => {
          navigator.clipboard.write([
              new ClipboardItem({ [blob.type]: blob })
          ])
      })
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
