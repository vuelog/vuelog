<template>
  <CommonBody>
    <template v-slot:content>
      <template v-if="postList && postList.posts">
        <div v-for="(item, index) in postList.posts" :key="'post-preview-item-' + index">
          <div class="post-preview">
            <a :href="$vuelog.postUrl(item.id)">
              <h2 class="post-title">
                {{ item.title }}
              </h2>
              <div class="post-content-preview">
                {{ item.content }}
              </div>
            </a>
            <p class="post-meta">
              {{ item.creationDate | moment('lll') }}
            </p>
          </div>
        </div>
      </template>
      <ul class="pager" v-if="pagers">
        <li v-for="page in pagers" :key="'pager-' + page.pageNumber">
          <a :href="$vuelog.pagedUrl(this, page.pageNumber)">{{ page.pageNumber }}</a>
        </li>
      </ul>
    </template>
  </CommonBody>
</template>
<script lang="ts">
import { Component, Prop, Vue} from 'vue-property-decorator';
import {ComponentProps, PostProp, SiteProp, Queries, Pageable, ListProp, DefaultPageable} from '@vuelog/front';

import CommonBody from './CommonBody.vue';

type Pager = Pageable;

@Component({
  components: {
    CommonBody
  }
})
export default class GlobalMain extends Vue implements ComponentProps {
  @Prop() public site!: SiteProp;
  @Prop() public list!: ListProp;
  @Prop() public post!: PostProp;
  @Prop() public routeType!: string;
  @Prop() public tagName!: string;
  @Prop() public categoryName!: string;
  @Prop() public queries!: Queries;

  public overridedList: ListProp | null = null;

  mounted() {
    console.log('GLOBAL MAIN', {
      routeType: this.routeType,
      tagName: this.tagName,
      categoryName: this.categoryName,
      queries: this.queries
    });

    this.overridedList = null;
    if (this.routeType === 'globalMain') {
      const pagable = DefaultPageable.create(1, 5, -1);
      this.$vuelog.handlers.getPostSummaries(this.queries, pagable)
          .then((result) => this.overridedList = result);
    }
  }

  get pagers(): Pager[] | null {
    if (this.list && this.list.pageable) {
      const pagable = this.list.pageable;
      const output: Pager[] = [];
      let pageIter = pagable.first();
      for (let i=1; i<=pagable.pageCount; i++) {
        output.push(pageIter);
        pageIter = pageIter.next();
      }
      return output;
    }
    return null;
  }

  get postList(): ListProp | null {
    if (this.overridedList)
      return this.overridedList;
    return this.list;
  }
}
</script>
