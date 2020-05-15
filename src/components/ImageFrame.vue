<template>
    <v-img
      class="image"
      :src="url"
      :class="{ animation: is_anime }"
      v-on:click="$emit('image-click'); anime();"
    > 
      <!--
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
      -->
      
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
