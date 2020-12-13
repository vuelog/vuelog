/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

import { CategoryItem, Post, PostSummary, TagItem, Queries, Pageable, PostList, GroupQueries, PostGroups } from './model';
import { VuelogModule } from './module';

export interface VuelogBackendHandler {
  /**
   * on start (once called)
   *
   * @param $vuelog VuelogModule
   */
  start?($vuelog: VuelogModule): void;

  /**
   * get featured tags
   */
  getFeaturedTags?(): Promise<TagItem[]>;

  /**
   * get categories
   */
  getCategories?(): Promise<CategoryItem[]>;

  /**
   * post list
   *
   * @param queries queries
   * @param pagable pagable object
   */
  getPostSummaries(queries?: Queries | null, pagable?: Pageable): Promise<PostList<PostSummary>>;

  /**
   * read post
   *
   * @param id {@link Post.id}
   */
  getPost(id: string): Promise<Post>;

  getPostGroups(queries: Queries | null, groupQueries: GroupQueries): Promise<PostGroups>;

  /**
   * tag query
   *
   * @param tagName {@link TagItem.name}
   */
  makeTagQuery(tagName: string): Queries;

  /**
   * category query
   *
   * @param categoryName {@link CategoryItem.name}
   */
  makeCategoryQuery(categoryName: string): Queries;
}
