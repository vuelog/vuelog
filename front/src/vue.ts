/*
 * Copyright (C) 2020 jc-lab.
 * Node module: @vuelog/front
 * This software may be modified and distributed under the terms
 * of the Apache License 2.0.  See the LICENSE file for details.
 */

import { Vue } from 'vue/types/vue';
import { ComponentOptions } from 'vue/types/options';

import { VuelogModule } from './module';

declare module 'vue/types/vue' {
  interface Vue {
    '$vuelog': VuelogModule;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    'vuelog'?: VuelogModule;
  }
}
