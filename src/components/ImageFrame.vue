<template>
  <v-img class="image" :src="url"/> 
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class ImageFrame extends Vue {
    @Prop()
    public url!: string;

  }
</script>

<style scoped>
.image {
  width:100%; height:100%;
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 20px #444;
  overflow: hidden;
}
</style>
