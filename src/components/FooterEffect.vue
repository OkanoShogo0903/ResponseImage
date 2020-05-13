<template>
  <div id="footer">
    <div id="text"> <slot></slot> </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  @Component
  export default class TextEffect extends Vue {
  }
</script>

<style lang="stylus" scoped>
div#footer
{
  position: fixed;           /* フッターの固定 */
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0px;
  background-color:#444;     /* 背景色(黒) */

  animation-direction: normal;
  animation-duration: 1.5s;
  animation-name: fade_in_and_out;
  animation-timing-function: forward;
}
 
div#text { 
  color: #fff;
  font-size: 18px;
  padding: 10px;
	margin: auto;              /* 中央揃え */
}

@keyframes fade_in_and_out {
  0%   { 
    height: 0px;
  }
  30%   {
    height: 50px;
  }
  70%   {
    height: 50px;
  }
  100%   {
    height: 0px;
  }
}

</style>
