<template>
    <v-btn v-if="is_fav" icon color="pink" @onClick="clicked">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class ImageFrame extends Vue {
    @Prop()
    public url!: string;
    @Prop()
    public is_fav!: Boolean;

    // @Emit
    private clicked(){
      console.log("clicked")
    }
  }
</script>

<style scoped>
</style>
