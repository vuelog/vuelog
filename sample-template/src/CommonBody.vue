<template>
  <div class="container">
    <div class="row">
      <div class="
            col-lg-8 col-lg-offset-1
            col-md-8 col-md-offset-1
            col-sm-12
            col-xs-12
            post-container
        ">
        <slot name="content">
        </slot>
      </div>
      <div class="
    col-lg-3 col-lg-offset-0
    col-md-3 col-md-offset-0
    col-sm-12
    col-xs-12
    sidebar-container
">
        <section>
          <hr class="hidden-sm hidden-xs">
          <h5>CATEGORIES</h5>
          <div class="categories">
            <ul style="padding-left: 2em;">
              <li v-for="(item, index) in $vuelog.site.categories"
                 :key="'cate-item-' + index">
                <a :title="item.title"
                   :href="$vuelog.categoryUrl(item.name)">
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <hr class="hidden-sm hidden-xs">
          <h5>FEATURED TAGS</h5>
          <div class="tags">
            <a v-for="(item, index) in $vuelog.site.tags"
               :key="'tag-item-' + index"
               :title="item.title"
               :href="$vuelog.tagUrl(item.name)">
              {{ item.title }}
            </a>
          </div>
        </section>
        <section>
          <hr>
          <h5>Archives</h5>
          <ul class="list-inline">
            <li v-for="(item, index) in archives" :key="'arc-' + index">
              <a :href="$vuelog.postsQueryUrl(item.queries)">{{ item.title }} ({{ item.count }})</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './_variables';
@import './_mixins';
@import './hux-blog';
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PostGroups } from '@vuelog/front';

@Component({})
export default class CommonBody extends Vue {
  public archives: PostGroups = [];

  mounted() {
    const getPostGroups = this.$vuelog.handlers.getPostGroups;
    if (getPostGroups) {
      getPostGroups(null, [
        {$year: 'creationDate'},
        {$month: 'creationDate'}
      ])
          .then((result) => this.archives = result);
    }
  }
}
</script>
