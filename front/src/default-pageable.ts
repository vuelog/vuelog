/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

import {
  Pageable, SortOrder
} from './model';

export class DefaultPageable implements Pageable {
  private _offset: number;
  private _pageNumber: number;
  private _pageSize: number;
  private _totalCount: number;
  private _sort: SortOrder[] | undefined;

  public static create(pageNumber: number, pageSize: number, totalCount?: number, sort?: SortOrder[] | undefined) {
    return new DefaultPageable(pageNumber, pageSize, typeof totalCount === 'undefined' ? -1 : totalCount, sort);
  }

  protected constructor(pageNumber: number, pageSize: number, totalCount: number, sort?: SortOrder[] | undefined) {
    this._offset = (pageNumber - 1) * pageSize;
    this._pageNumber = pageNumber;
    this._pageSize = pageSize;
    this._totalCount = totalCount;
    this._sort = sort;
  }

  public get pageCount(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  first(): Pageable {
    return new DefaultPageable(1, this._pageSize, this._totalCount, this.sort);
  }

  next(): Pageable {
    return new DefaultPageable(this._pageNumber + 1, this._pageSize, this._totalCount, this.sort);
  }

  previousOrFirst(): Pageable {
    const newPageNumber = Math.max(1, this._pageNumber - 1);
    return new DefaultPageable(newPageNumber, this._pageSize, this._totalCount, this.sort);
  }


  get offset(): number {
    return this._offset;
  }

  public get pageNumber(): number {
    return this._pageNumber;
  }

  public get pageSize(): number {
    return this._pageSize;
  }


  public get totalCount(): number {
    return this._totalCount;
  }

  public get sort(): SortOrder[] | undefined {
    return this._sort;
  }
}
