<template>
  <v-select
    v-model="selects"
    :items="items"
    label="label"
    multiple
    chips
    persistent-hint
    deletable-chips
    :hint="max_select+'つまで選択可能'"
    :error="selects.length > max_select"
  ></v-select>
</template>

<script lang="ts">
  import { Component, Watch, Prop, Emit, Vue } from 'vue-property-decorator';

  @Component({
    components: {
    },
  })
  export default class MultiSelect extends Vue {

    @Prop()
    public items!: string[];
    @Prop()
    public label_?: string;
    @Prop()
    public max_select!: number;

    public selects: string[] = Array();
    //public is_error: Boolean = false;

    @Watch('selects')
    @Emit()
    public changed(s: (string | null)[] ){
      console.log(this.selects.length > this.max_select)
      //this.is_error ? this.selects.length > this.max_select
    }

    public created(){
      console.log(this.max_select)
    }
  }
</script>
