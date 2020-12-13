<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <component :is="xx" :data="data" v-if="xx" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import TestTemplate01 from "@/components/TestTemplate01.vue";
import TestTemplate02 from "@/components/TestTemplate02.vue";

const complist = [TestTemplate01, TestTemplate02];

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private index = 0;

  private timer: any;

  public mounted() {
    this.timer = setInterval(() => {
      this.index = (this.index + 1) % 2;
    }, 1000);
  }

  public destroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public get xx() {
    return complist[this.index];
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
