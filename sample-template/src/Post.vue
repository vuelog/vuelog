<template>
  <CommonBody>
    <template v-slot:content>
      <article>
        <div class="container">
          <p style="font-size: 2em">TOC</p>
          <div ref="tocTable"></div>
          <hr />
          <vue-markdown :source="post.content" :html="true" :toc="site.config.post.showTOC" :toc-first-level="1" :toc-id="tocTableId"></vue-markdown>
        </div>
      </article>
    </template>
  </CommonBody>
</template>
<style lang="scss" scoped>
@import './_variables';
@import './_mixins';
@import './hux-blog';

</style>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import { ComponentProps, SiteProp, PostProp } from '@vuelog/front';

import CommonBody from './CommonBody.vue';

import prismjs from 'prismjs';
// import VueMarkdown from 'vue-markdown';

@Component({
  components: {
    CommonBody
  }
})
export default class Post extends Vue implements ComponentProps {
  @Prop() public site!: SiteProp;
  @Prop() public post!: PostProp;

  public tocTableId: string = '';

  mounted() {
    const tocTable: Element = this.$refs.tocTable as Element;

    this.$nextTick(() => prismjs.highlightAll());

    const tocTableId = 'tocTable';
    tocTable.id = tocTableId;
    this.tocTableId = tocTableId;
  }
}
</script>
