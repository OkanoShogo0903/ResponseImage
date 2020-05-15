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
      <v-list-item two-line :class="'px-0'">
        <v-list-item-avatar>
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item-content @click="onAllGenreClick();" link>
        <v-list-item-title>
        <v-btn> 人気順 </v-btn>
        </v-list-item-title>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item-content @click="onAllGenreClick();" link>
        <v-list-item-title>
        <v-btn> お気に入り </v-btn>
        </v-list-item-title>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item-content @click="onAllGenreClick();" link>
        <v-list-item-title>
        <v-btn> ユーザのアップロード画像 </v-btn>
        </v-list-item-title>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item v-for="choice in genre_list" link >
        <v-list-item-content @click="onGenreClick(choice);">
          <v-list-item-title>
              {{ choice }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item-content @click="onUploadClick()">
        <v-btn>
          <span class="mr-2"> 画像をアップロード </span>
        </v-btn>
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-btn
            href="https://github.com/OkanoShogo0903?tab=repositories"
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

  @Component
  export default class Navigation extends Vue {
    drawer: boolean = true;

    color: string = 'primary';

    @Prop()
    public genre_list!: string[];

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
