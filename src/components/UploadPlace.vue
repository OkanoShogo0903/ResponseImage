<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-subheader v-text="'キャラクターを指定してください'"></v-subheader>
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="select_charactor"
            :items="candidate_charactor"
            :rules="[v => !!v || 'Item is required']"
            label="キャラクター"
          ></v-select>
        </v-col>

        <div v-if="select_charactor === add_phrase">
          <v-col cols="12" sm="6">
            <v-subheader v-text="'新しく追加するキャラクター名'"></v-subheader>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="new_charactor"
              :rules= "[
                v => !!v,
                v => (v && v.length <= 15) || 'キャラクター名は15文字以下にしてください'
              ]"
              :counter="15"
              label="キャラクター"
            ></v-text-field>
          </v-col>
        </div>

        <v-col cols="12" sm="6">
          <v-subheader v-text="'ジャンルを指定する'"></v-subheader>
        </v-col>

        <v-col cols="12" sm="6">
          <MultiSelect
            v-model="select_genre"
            :items="candidate_genre"
            label_="ジャンル"
            max_select="3"
          />
        </v-col>

      </v-row>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must check to continue!']"
        label="R18コンテンツではありません"
        required
      ></v-checkbox>

      <vue-dropzone v-if="dropzoneOptions" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

      <v-btn
        :disabled="!valid"
        @click="submit"
        class=submit_btn
      >
        画像を投稿
      </v-btn>

    </v-form>

  </v-container>
</template>

<script lang="ts">
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';
  import { Component, Vue } from 'vue-property-decorator';

  import { getAllGenre, getAllCharactor, pressUploadUrl } from '@/common/Api';
  import MultiSelect from '@/components/MultiSelect.vue';

  @Component({
    components: {
      vueDropzone: vue2Dropzone,
      MultiSelect,
    },
  })

  export default class Navigation extends Vue {
    // TODO: アップロードゾーンとアップロードボタンを別に用意する
    // TODO: キャラクター一覧のドロップダウンから選択できるようにする

    public valid: ( Boolean | null ) = true;
    public checkbox: Boolean = false;

    private new_charactor: ( String | null ) = null;

    public none_phrase: string = '選択しない';
    public add_phrase: string = '新しく追加する';

    public candidate_charactor: string[] = Array();
    public candidate_genre: string[] = Array();

    public select_charactor: ( string | null ) = this.none_phrase; // デフォルトで選択なし
    public select_genre: ( string | null )[] = Array();

    public dropzoneOptions: any = {
      url: pressUploadUrl(this.select_charactor, this.select_genre),
      method: 'put',
      maxFilesize: 5,
    };

    private submit () {
      console.log("pressed submit")
        /*
        if ( this.$refs.form.validate() ) {
          axios.post('/api/submit', {
            charactor: this.select_charactor,
            genre_primary: this.select_genre,
            ....
          })
        }
        */
    };

    public created () {
      this.candidate_charactor = getAllCharactor();
      this.candidate_charactor.unshift(this.add_phrase)
      this.candidate_charactor.push(this.none_phrase)

      this.candidate_genre = getAllGenre();
      this.candidate_genre.push(this.add_phrase)
    };
  }
</script>

<style scoped>
.submit_btn {
  margin: 30px;
  width:20%; height:100%;
}
</style>
