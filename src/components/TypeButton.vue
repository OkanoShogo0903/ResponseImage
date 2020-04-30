<template>
    <button @click="onClick">
      <slot></slot>
    </button>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class MyButton extends Vue{
    @Prop()
    public msg!: string;

    @Emit()
    public click(){
    }

    public onClick(){
      this.click();
    }
  }
</script>
