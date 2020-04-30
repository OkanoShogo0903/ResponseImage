<template>
    <button @click="onClick">Reset</button>
</template>

<script lang="ts">
  import {Component, Emit, Vue} from "vue-property-decorator";

  @Component
  export default class ResetButton extends Vue {
    public value!: string;

    public initialValue!: string;

    public created(){
        this.initialValue = this.value;
    }

    @Emit()
    public input(value: string) {
    }

    public onClick(){
        this.input(this.initialValue);
    }
  }
</script>
