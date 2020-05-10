<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :mini-variant="miniVariant"
    absolute
    dark
  >
    <v-list
      dense
      nav
      class="py-0"
    >
      <v-list-item two-line :class="miniVariant && 'px-0'">
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
        <v-list-item-content @click="onClick(choice);">
          <v-list-item-title>{{ choice }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-btn
          href="https://github.com/OkanoShogo0903?tab=repositories"
          target="_blank"
          text
        >
          <span class="mr-2">Github</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
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
    colors: string[] = [
      'primary',
      'blue',
      'success',
      'red',
      'teal',
    ];
    miniVariant: boolean = false;

    @Prop()
    public genre_list!: string[];

    @Emit()
    public input(selected: string) {
    }

    public onClick(s: string){
      console.log("onClick");
      this.input(s);
    }
  }

</script>
