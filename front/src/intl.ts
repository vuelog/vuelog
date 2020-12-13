/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

import {
  TemplateLayouts
} from './model/layouts';

export interface TemplateConfig {
  current: TemplateLayouts;
}

const templates: Record<string, TemplateLayouts> = {};
const templateConfig: TemplateConfig = {} as any;

export function registerTemplateImpl(name: string, layouts: TemplateLayouts) {
  templates[name] = layouts;
  templateConfig.current = layouts;
}

export function getTemplateConfig() {
  return templateConfig;
}
