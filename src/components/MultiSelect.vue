<template>
  <v-select
    v-model="value"
    :items="items"
    label="label"
    multiple
    chips
    persistent-hint
    deletable-chips
    :hint="max_select+'つまで選択可能'"
    :error="value.length > max_select"
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
    public value!: string[];
    @Prop()
    public items!: string[];
    @Prop()
    public max_select!: number;
    @Prop()
    public label_?: string;

    //public is_error: Boolean = false;

    @Watch('value')
    public changed(s: (string)[] ){
      console.log(s)
      this.$emit('input', s)
    }
  }
</script>
