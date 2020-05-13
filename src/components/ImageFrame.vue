<template>
    <v-img
      class="image"
      :src="url"
      v-on:click="$listeners['parentMethod']"
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
      
      <Favorite v-if="is_fav!=undefined" v-on:click.stop/>
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
    public is_fav?: Boolean;
    @Prop()
    public is_copy?: Boolean;
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
