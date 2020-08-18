<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    fixed
    absolute
    dark
    clipped
  >
    <v-list
      dense
      nav
      class="py-0"
    >
      <!-- TODO: ロゴ画像に差し替え -->
      <v-list-item two-line :class="'px-0'">
        <v-list-item-avatar>
          <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> C-Board </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item-content @click="onAllGenreClick();" link>
        <v-btn> 人気順 </v-btn>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item-content @click="onAllGenreClick();" link>
        <v-btn> お気に入り </v-btn>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item-content @click="onAllGenreClick();" link>
        <v-btn> アップロードした画像 </v-btn>
      </v-list-item-content>

      <v-divider></v-divider>

      <div v-if="genres">
      <v-list-item
        v-for="g in genres"
        link
      >
        <v-list-item-content @click="onGenreClick(g);">
          <v-list-item-title>
            {{ g }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </div>

      <v-divider></v-divider>

      <v-list-item-content @click="onUploadClick()">
        <v-btn> <span class="mr-2"> 画像をアップロード </span> </v-btn>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-btn
            :href=github
            target="_blank"
            text
          >
            <span class="mr-2">Github</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { getAllGenre } from '@/common/Api';

  @Component
  export default class Navigation extends Vue {
    private drawer: boolean = true;
    private color: string = 'primary';
    private github: string = 'https://github.com/OkanoShogo0903?tab=repositories'
    private genres: string[] = [];

    public mounted(){
      getAllGenre().then(res => {
        this.genres = res
      })
    }

    public onAllGenreClick(){
      this.$router.push('/')
    }

    public onGenreClick(genre: string){
      this.$router.push('/image/' + genre)
    }

    public onUploadClick(){
      this.$router.push('/upload')
    }
  }

</script>
