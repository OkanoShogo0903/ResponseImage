<template>
  <div id="footer" :class="{ animation: is_anime }">
    <div id="text"> <slot></slot> </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  @Component
  export default class TextEffect extends Vue {
    // Footer Animation.
    // TODO: もうちょっと派手にする
    private is_anime: Boolean = false;
    private wait_ms: number = 1500;
    private interval: any = null;

    public anime():void{
      if (this.is_anime === true || this.interval !== null) {
        return
      }
      this.is_anime = true
      this.interval = setInterval(() => {
        this.is_anime = false
        clearInterval(this.interval)
        this.interval = null
      }, this.wait_ms)
    }

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
  background-color:#1DA1F2;     /* フッターの色 */
}

div#text { 
  color: #fff;
  font-size: 18px;
  padding: 10px;
  margin: auto;              /* 中央揃え */
}

.animation {
  animation-direction: normal;
  animation-duration: 1.5s;
  animation-name: fade_in_and_out;
  animation-timing-function: forward;
}
 
@keyframes fade_in_and_out {
  0%   { 
    height: 0px;
  }
  25%   {
    height: 50px;
  }
  75%   {
    height: 50px;
  }
  100%   {
    height: 0px;
  }
}

</style>
