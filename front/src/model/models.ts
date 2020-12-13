/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

/* eslint-disable @typescript-eslint/no-use-before-define */

export type PostContentType = 'markdown' | 'html' | 'plaintext';

export interface TagItem {
  name: string;
  title: string;
}

export interface CategoryItem {
  /**
   * exclude characters : '/'
   */
  name: string;

  /**
   * Category Title
   */
  title: string;

  /**
   * post count
   */
  postCount?: number;
}

export interface Post {
  /**
   * URL ID
   */
  id: string;

  /**
   * Creation Date
   */
  creationDate: Date;

  /**
   * Last modification date
   * If you haven't modified it, undefined
   */
  lastModificationDate?: Date | undefined;

  /**
   * Title
   */
  title: string;

  /**
   * Author information
   */
  author: {
    id: string;
    name: string;
    attributes?: Record<string, any>;
  };

  /**
   * contentType
   * - markdown
   * - html
   * - plaintext
   */
  contentType: PostContentType;

  /**
   * content
   */
  content: string;

  category: CategoryItem;
  tags: TagItem[];
}

export type PostSummary = Post;

/**
 * creationDate : {@link Post.creationDate}
 * author       : {@link Post.author.id}
 */
export type SortableProperty = 'creationDate' | 'author' | string;

export interface SortOrder {
  direction: 'asc' | 'desc';
  property: 'creationDate' | 'author' | string;
}

export type QueryableProperty = 'author' | 'title' | 'content' | 'creationDate' | 'tag' | 'category';

export type PropertyQueryOperator = '$year' | '$month' | '$day';
export type PropertyOperatingQuery = {
  [key in PropertyQueryOperator]?: string;
};

export type QueryOperator = '$and' | '$or';
export type PropertyQuery = {
  [key in QueryableProperty]?: string | PropertyOperatingQuery;
};

export interface OperatingQueryAnd {
  '$and': Queries[];
}
export interface OperatingQueryOr {
  '$or': Queries[];
}
export interface OperatingQueryEq {
  '$eq': PropertyQuery;
}
export type OperatingQuery = OperatingQueryAnd | OperatingQueryOr | OperatingQueryEq;
export type Queries = OperatingQuery | PropertyQuery;

/**
 * [{$year: 'creationTime'}, {$month: 'creationTime'}]
 */
export type GroupQuery = { [key: string]: string };
export type GroupQueries = GroupQuery[];

// const testQueryA: Queries = {
//   author: 'Joseph'
// };
// const testQueryB: Queries = {
//   '$or': [
//     {author: 'Joseph'},
//     {author: 'Tester'},
//     {
//       '$and': [
//         {author: 'Happy'},
//         {title: 'Day'}
//       ]
//     }
//   ]
// };

export interface Pageable {
  /**
   * 기본 페이지 및 페이지 크기에 따라 취할 오프셋
   * ((pageNumber - 1) * pageSize)
   */
  offset: number;

  /**
   * 현재 페이지 번호
   * Minimum : 1
   */
  pageNumber: number;

  /**
   * 한 페이지에 보여 줄 개수
   */
  pageSize: number;

  /**
   * 총 개수
   */
  totalCount: number;

  /**
   * 총 페이지 수
   * = ceil(totalCount / pageSize)
   */
  readonly pageCount: number;

  sort: SortOrder[] | undefined;

  first(): Pageable;
  next(): Pageable;
  previousOrFirst(): Pageable;
}

export interface PostGroup {
  title: string;
  count: number;
  queries: Queries;
}

export type PostGroups = PostGroup[];

export interface PostList<T> {
  pageable: Pageable;
  posts: T[];
}

/* eslint-enable @typescript-eslint/no-use-before-define */
