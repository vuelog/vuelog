/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

import './vue';

import { TemplateLayouts } from './model/layouts';

import AppView from './view/AppView.vue';
export { AppView };

import { registerTemplateImpl } from './intl';

export * from './route';
export * from './model';
export * from './module';
export * from './backend';
export * from './default-pageable';

function isPromise<T>(v: any): v is Promise<T> {
  return 'then' in v;
}

export type TemplateLayoutsImport = TemplateLayouts | { default: TemplateLayouts };
export function registerTemplate(name: string, module: TemplateLayoutsImport): void;
export function registerTemplate(name: string, module: Promise<TemplateLayoutsImport>): Promise<void>;
export function registerTemplate(name: string, module: TemplateLayoutsImport | Promise<TemplateLayoutsImport>): void | Promise<void> {
  if ('default' in module) {
    registerTemplateImpl(name, module.default);
  } else if (isPromise(module)) {
    return module
      .then((resolvedModule) => {
        registerTemplate(name, resolvedModule);
      });
  } else {
    registerTemplateImpl(name, module);
  }
}

