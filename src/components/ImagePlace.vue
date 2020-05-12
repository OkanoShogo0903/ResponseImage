<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="url in urls" cols="4">
          <ImageFrame :url="url" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
  import {getImageUrl, getAllImageUrl ,getAllGenre } from '@/common/Api';
  import {Component, Prop, Watch, Vue} from "vue-property-decorator";
  import ImageFrame from "@/components/ImageFrame.vue";

  @Component({
    components: {
      ImageFrame,
    },
  })
  export default class ImagePlace extends Vue {
    private urls: string[] = new Array();

    @Prop()
    public genre?: ( string | null );

    // ページ遷移時に画像をリクエストしているが、これはSPAとして正しいのか?
    @Watch('genre')
    onRouterChanged(to: string, from: string) {
      console.log("Watch")
      if (to !== from) {
        this.updatePage(this.genre)
      }
    }

    created(){
      console.log("Created")
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
