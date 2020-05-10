<template>
  <div>
    <vue-dropzone v-if="dropzoneOptions" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
  </div>
</template>

<script lang="ts">
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      vueDropzone: vue2Dropzone,
    },
  })

  export default class Navigation extends Vue {
    // TODO: アップロードゾーンとアップロードボタンを別に用意する
    // TODO: キャラクター一覧のドロップダウンから選択できるようにする
    @Prop()
    public upload_endpoint!: string;

    public character: ( string | null ) = null
    public attributes: ( string | null )[] = ["あいさつ", null, null] 

    public upload_url: string = this.upload_endpoint + '?character=' + this.character + '&primary=' + this.attributes[0] + '&secondary=' + this.attributes[1] + '&tertiary=' + this.attributes[2]

    public dropzoneOptions: any = {
      url: this.upload_url,
      method: 'put',
      maxFilesize: 5,
    }
    public created(){
      console.log(this.upload_endpoint)
      console.log(this.upload_url)
    }
  }
</script>

