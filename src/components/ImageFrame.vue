<template>
  <li>
    <img class="image" :src="url"/> 
  </li>
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
  position: relative;
  width: 180px; height: 100px;
  background-color: #fff;
  border: solid 10px #fff;
  box-shadow: 0 0 20px #444;
  overflow: hidden;
}
</style>
