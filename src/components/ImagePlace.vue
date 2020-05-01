<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="url in urls" :key="i" cols="4">
        <ImageFrame :url="url" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import ImageFrame from "@/components/ImageFrame.vue";

  @Component({
    components: {
      ImageFrame,
    },
  })
  export default class ImagePlace extends Vue {
    // Load image url
    public urls: string[] = [
      require("@/assets/ehehe.jpg"),
      require("@/assets/kuku.jpg"),
      require("@/assets/mimamori.jpg"),
      require("@/assets/otu.jpg"),
      require("@/assets/outikaero.png"),
      require("@/assets/tisu.jpg"),
      require("@/assets/yunomi.png"),
    ]

    public created(){
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
