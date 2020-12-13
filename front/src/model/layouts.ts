/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

import {
  Component
} from 'vue';

import { RouteType } from '../route';

import {
  Post,
  PostList,
  PostSummary,
  TagItem,
  CategoryItem
} from './models';

export interface SiteConfig {
  baseUrl?: string | undefined;
  template: string;
  title: string;
  post: {
    showTOC: boolean;
  };
  params?: any;
}

export interface SiteProp {
  baseUrl: string;
  config: SiteConfig;
  tags: TagItem[];
  categories: CategoryItem[];
  custom?: any;
}

export type ListProp = PostList<PostSummary>;

export type PostProp = Post;

export interface ComponentProps {
  /**
   * Site Configuration
   */
  site?: SiteProp;

  list?: ListProp | null;

  /**
   * Current Page
   */
  post?: PostProp | null;

  /**
   * Route Type
   */
  routeType?: RouteType;
}

export interface TemplateLayouts {
  topNavComponent: Component;
  headerComponent: Component;
  mainPageComponent: Component;
  postListComponent: Component;
  postComponent: Component;
  footerComponent: Component;
}
