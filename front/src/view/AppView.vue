<!--
 Copyright (C) 2020 jc-lab.
 Node module: @vuelog/front
 This software may be modified and distributed under the terms
 of the Apache License 2.0.  See the LICENSE file for details.
-->
<template>
  <div class="vuelog-root">
    <component v-if="layouts && layouts.topNavComponent" :is="layouts.topNavComponent"
               :routeType="routeType" :site="site" :post="post" />
    <component v-if="layouts && layouts.headerComponent" :is="layouts.headerComponent"
               :routeType="routeType" :site="site" :post="post" />
    <component v-if="layouts && routeType === 'main' && layouts.mainPageComponent" :is="layouts.mainPageComponent"
               :routeType="routeType" :site="site" :list="list" />
    <component v-else-if="layouts && isPostList && layouts.postListComponent" :is="layouts.postListComponent"
               :routeType="routeType" :site="site" :queries="queries" :list="list" :tagName="tagName" :categoryName="categoryName" :pageNumber="pageNumber" />
    <component v-else-if="layouts && isPostView && layouts.postComponent && post" :is="layouts.postComponent"
               :routeType="routeType" :site="site" :post="post" :postId="postId" />
    <slot
        v-else-if="routeType && routeType.startsWith('custom:')"
        :name="routeType"
        :routeType="routeType" :site="site" :post="post"
    >
      DEF SLOT
    </slot>
    <component v-if="layouts && layouts.footerComponent" :is="layouts.footerComponent" :site="site" :post="post" :routeType="routeType"  />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { SiteProp, PostProp, ListProp, TemplateLayouts, Queries } from '../model';
import { RouteType } from '../route';
import { DefaultPageable } from '../default-pageable';
import { TemplateConfig, getTemplateConfig } from '../intl';

@Component({})
export default class VuelogAppView extends Vue {
  private templateConfig!: TemplateConfig;
  private layouts: TemplateLayouts | false = false;

  @Prop() private tagName!: string;
  @Prop() private categoryName!: string;
  @Prop() private encodedQueries!: string;
  @Prop() private postId!: string
  @Prop() private pageNumber!: number;
  @Prop() private vuelogRouteType!: RouteType;

  private list: ListProp | null = null;
  private post: PostProp | null = null;

  public get routeType(): RouteType {
    return this.vuelogRouteType;
  }

  public get isPostList(): boolean {
    return ['main', 'tagPosts', 'categoryPosts', 'queryPosts'].indexOf(this.routeType) >= 0;
  }
  public get isPostView(): boolean {
    return this.routeType === 'post';
  }

  created() {
    this.templateConfig = getTemplateConfig();
    this.onTemplateConfigChanged();
  }

  mounted() {
    this.routeUpdated();
  }

  @Watch('routeType')
  public routeUpdated() {
    const pagable = DefaultPageable.create(this.pageNumber, 5);

    if (this.isPostList) {
      this.$vuelog.handlers.getPostSummaries(this.queries, pagable)
          .then((result) => this.list = result);
    }

    if (this.isPostView && this.postId) {
      this.$vuelog.handlers.getPost(this.postId)
          .then(post => this.post = post);
    }
  }

  public get queries(): undefined | Queries {
    try {
      if (this.encodedQueries) {
        return this.$vuelog.decodeQueries(this.encodedQueries);
      } else if (this.tagName) {
        return this.$vuelog.handlers.makeTagQuery(this.tagName);
      } else if (this.categoryName) {
        return this.$vuelog.handlers.makeCategoryQuery(this.categoryName);
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }

  @Watch('templateConfig', { deep: true })
  onTemplateConfigChanged(): void {
    this.layouts = this.templateConfig.current;
  }

  get site(): SiteProp {
    return this.$vuelog.site;
  }
}
</script>
