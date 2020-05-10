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

      <v-list-item v-for="choice in genre_list" link >
        <v-list-item-content @click="onGenreClick(choice);">
          <v-list-item-title>{{ choice }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <v-btn @click="onUploadClick()">
            <span class="mr-2">画像をアップロード</span>
          </v-btn>
        </v-list-item-content>
      </v-list-item>

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
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Navigation extends Vue {
    drawer: boolean = true;

    color: string = 'primary';

    @Prop()
    public genre_list!: string[];

    @Emit()
    public inputGenre(selected: string) {}

    public setUploadPage(is_upload: boolean) {}

    public onGenreClick(s: string){
      this.inputGenre(s);
      this.setUploadPage(false);
    }
    public onUploadClick(){
      this.setUploadPage(true);
    }
  }

</script>
