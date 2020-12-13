/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

import OurVue, { VueConstructor } from 'vue';
import base64 from 'base64-js';
import { VuelogBackendHandler } from './backend';

import {CategoryItem, ComponentProps, Queries, SiteConfig, SiteProp, TagItem} from './model';

export interface VuelogModuleOptions {
  baseUrl: string;
  handler: VuelogBackendHandler;
}

const rootContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: undefined as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vueConstructor: undefined as any
} as {
  instance: VuelogModule;
  vueConstructor: VueConstructor;
};

const vueModulePropName = '$vuelog';
const symbolSiteProp = Symbol('SiteProp');
const symbolGlobalInited = Symbol();
const symbolHandlers = Symbol();

function vueInit() {
  if (rootContext.vueConstructor && rootContext.instance) {
    rootContext.vueConstructor.mixin({
      beforeCreate(): void {
        rootContext.vueConstructor.observable(rootContext.instance);
        rootContext.vueConstructor.observable(rootContext.instance[symbolSiteProp]);
      },
      created(): void {
        const instance: VuelogModule = rootContext.instance;
        if (!instance[symbolGlobalInited]) {
          instance[symbolGlobalInited] = true;
          const handlers = instance[symbolHandlers];
          Promise.resolve(handlers.start && handlers.start(instance))
            .then(() => {
              if (handlers.getFeaturedTags) {
                handlers.getFeaturedTags()
                  .then((tags) => instance[symbolSiteProp].tags = tags);
              }
              if (handlers.getCategories) {
                handlers.getCategories()
                  .then((categories) => instance[symbolSiteProp].categories = categories);
              }
            });
        }
      }
    });
  }
}

function fixBaseUrl(input: string) {
  if (input.length > 0) {
    return (input.charAt(input.length - 1) === '/') ? input : `${input}/`;
  }
  return input;
}

class SitePropImpl implements SiteProp {
  public defaultBaseUrl: string = '';
  // eslint-disable-next-line
  public config: SiteConfig = {} as any;
  public tags: TagItem[] = [];
  public categories: CategoryItem[] = [];
  public get baseUrl(): string {
    return this.config.baseUrl || this.defaultBaseUrl;
  }
}

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

export class VuelogModule {
  public static install(vueConstructor: VueConstructor /*, options?: never */): void {
    if (OurVue !== vueConstructor) {
      console.error(`Multiple instances of Vue detected
See https://github.com/vuetifyjs/vuetify/issues/4068
If you're seeing "$attrs is readonly", it's caused by this`)
    }

    if (!vueConstructor.prototype[vueModulePropName]) {
      Object.defineProperty(vueConstructor.prototype, vueModulePropName, {
        get () {
          return rootContext.instance;
        },
      });
      rootContext.vueConstructor = vueConstructor;
      vueInit();
    }
  }

  public [symbolGlobalInited]: boolean = false;

  public [symbolHandlers]: VuelogBackendHandler;

  public [symbolSiteProp]: SitePropImpl = new SitePropImpl();

  constructor(options: VuelogModuleOptions) {
    rootContext.instance = this;
    this[symbolHandlers] = options.handler;
    this[symbolSiteProp].defaultBaseUrl = fixBaseUrl(options.baseUrl);
    vueInit();
  }

  public get site(): SiteProp {
    return this[symbolSiteProp];
  }

  public setSiteConfig(config: SiteConfig) {
    this[symbolSiteProp].config = config;
  }

  public absUrl(relUrl: string): string {
    return this.site.baseUrl + '/' + (relUrl.startsWith('/') ? relUrl.substring(1) : relUrl);
  }

  /**
   * get tag url
   *
   * @param tagName {@link TagItem.name}
   */
  public tagUrl(tagName: string): string {
    return `${this.site.baseUrl}tag/${tagName}/posts/`;
  }

  /**
   * get category url
   *
   * @param categoryName {@link CategoryItem.name}
   */
  public categoryUrl(categoryName: string): string {
    return `${this.site.baseUrl}category/${categoryName}/posts/`;
  }

  public encodeQueries(queries: Queries): string {
    return base64.fromByteArray(utf8Encoder.encode(JSON.stringify(queries)));
  }

  public decodeQueries(encoded: string): Queries {
    return JSON.parse(utf8Decoder.decode(base64.toByteArray(encoded)));
  }

  /**
   * get a post url
   * @param postId {@link Post.id}
   */
  public postUrl(postId: string): string {
    return `${this.site.baseUrl}post/${postId}`;
  }

  /**
   * get posts query url
   *
   * @param queries
   */
  public postsQueryUrl(queries: Queries): string {
    return `${this.site.baseUrl}query/${this.encodeQueries(queries)}/posts`;
  }

  public pagedUrl(component: ComponentProps, pageNumber: number) {
    return `?page=${pageNumber}`;
  }

  public get handlers(): VuelogBackendHandler {
    return this[symbolHandlers];
  }
}

/* eslint-enable @typescript-eslint/no-use-before-define */
