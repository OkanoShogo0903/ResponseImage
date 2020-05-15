<template>
  <v-container>
    <v-form ref="form" lazy-validation>
      <v-row justify="space-around" align="center" class="space">
        <v-col cols="12" sm="6" class="space">
          <v-subheader v-text="'画像を選択してください'"></v-subheader>
        </v-col>
        <v-col cols="12" sm="6">
          <vue-dropzone
            v-if="dropzoneOptions"
            ref="myDropzone"
            class="space"
            id="dropzone"
            :options="dropzoneOptions"
            @vdropzone-complete="submitted"
            @vdropzone-max-files-reached="drop_length=$refs.myDropzone.getQueuedFiles().length; checkSubmitValid()"
            >
          </vue-dropzone>
        </v-col>

        <v-col cols="12" sm="6" class="space">
          <v-subheader v-text="'キャラクターを指定してください'"></v-subheader>
        </v-col>
        <v-col cols="12" sm="6" class="space">
          <v-select
            v-model="select_charactor"
            :items="candidate_charactor"
            :rules="[v => !!v || 'Item is required']"
            label="キャラクター"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" class="space" v-if="select_charactor === add_phrase">
          <v-subheader v-text="'新しく追加するキャラクター名'"></v-subheader>
        </v-col>
        <v-col cols="12" sm="6" class="space" v-if="select_charactor === add_phrase">
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
        <!-- TODO: ユーザが直接入力できるフォームは記号を許さないように制約をかける -->

        <v-col cols="12" sm="6" class="space">
          <v-subheader v-text="'ジャンルを指定してください'"></v-subheader>
        </v-col>

        <v-col cols="12" sm="6" class="space">
          <v-select
            multiple
            label="ジャンル"
            v-model="select_genre"
            :items="candidate_genre"
            :hint="max_select+'つまで選択可能'"
            :error="select_genre.length > max_select"
            chips
            persistent-hint
            deletable-chips
            v-on:change="checkSubmitValid();"
          />
          <!--
          <v-btn class="mx-2" fab dark color="indigo">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          -->
        </v-col>

        <v-checkbox
          class="space"
          v-model="is_checkbox"
          :rules="[v => !!v || 'You must check to continue!']"
          v-on:change="checkSubmitValid();"
          label="R18コンテンツではありません"
          required >
        </v-checkbox>
      </v-row>

      <div class="warning_text">
        投稿された画像はユーザ情報と共に保存されます。
      </div>

      <v-btn
        :disabled="!is_valid"
        @click="$refs.myDropzone.processQueue();"
        class=submit_btn
      >
        画像を投稿
      </v-btn>

    </v-form>

    <FooterEffect ref="effect"> {{ effect_text }} </FooterEffect>
  </v-container>
</template>

<script lang="ts">
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';
  import { Component, Watch, Vue } from 'vue-property-decorator';

  import FooterEffect from "@/components/FooterEffect.vue";
  import { getAllGenre, getAllCharactor, pressUploadUrl } from '@/common/Api';

  @Component({
    components: {
      FooterEffect,
      vueDropzone: vue2Dropzone,
    },
  })

  export default class Navigation extends Vue {
    // TODO: アップロードゾーンとアップロードボタンを別に用意する
    // TODO: キャラクター一覧のドロップダウンから選択できるようにする
    $refs!: { // typescriptは子の関数も型が分からないとキレるので.
        effect: FooterEffect,
    }

    public is_valid: ( Boolean | null ) = false;
    public is_checkbox: Boolean = false;

    private new_charactor: ( String | null ) = null;

    public none_phrase: string = '選択しない';
    public add_phrase: string = '新しく追加する';

    public candidate_charactor: string[] = Array();
    public candidate_genre: string[] = Array();

    public select_charactor: string = this.none_phrase; // デフォルトで選択なし
    public select_genre: string[] = Array();
    public max_select: number = 3;

    private drop_length: number = 0;

    private effect_text: (string | null) = null;

    private image_queue_length: number = 0;
    public dropzoneOptions: any = {
      url: pressUploadUrl(this.select_charactor, this.select_genre),
      method: 'put',
      maxFiles: 1,
      maxFilesize: 5,
      autoProcessQueue: false,
    };

    private checkSubmitValid () {
      if (this.select_genre.length > 0) {
        if (this.select_genre.length <= this.max_select) {
          if (this.is_checkbox) {
            if ( this.drop_length > 0 ) {
              this.is_valid = true;
              return
            }
          }
        }
      }
      this.is_valid = false;
    };

    public created () {
      this.candidate_charactor = getAllCharactor();
      this.candidate_charactor.unshift(this.add_phrase)
      this.candidate_charactor.push(this.none_phrase)

      this.candidate_genre = getAllGenre();
      this.candidate_genre.push(this.add_phrase)
    };

    private submitted(res: any){
      console.log(res)
      console.log(res.status)
      if (res.status === "success") { // res.ok でチェックするとundefinedになるので、200かどうかでチェックしとく
        this.effect_text = "Uploaded"
      }
      else {
        this.effect_text = "Failed"
      }
      this.$refs.effect.anime(); // アニメーション開始

      var that = this
      setTimeout( function(){that.reload(that)}, 2000); // アニメーションが終わったころにリロード
    }

    private reload(that: any) {
        that.$router.go({path: that.$router.currentRoute.path, force: true});
    }
  }
</script>

<style scoped>
.space {
  padding: 30px;
}
.warning_text{
  font-size: 11px;
}
.submit_btn {
  margin: 30px;
  width:20%; height:100%;
}
</style>
