<template>
  <vue-dropzone v-if="dropzoneOptions" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  export default {
    name: 'UploadPage',
    components: {
      vueDropzone: vue2Dropzone
    },
    props: ['upload_url'],
    data: () => ({
      upload_url:"",
      dropzoneOptions: {
        url: upload_url,
        method: 'put',
        maxFilesize: 0.5,
      }
    })
  }
</script>

