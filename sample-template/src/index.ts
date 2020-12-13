import Vue from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue, {IconsPlugin} from 'bootstrap-vue'

import VueMoment from 'vue-moment'
import moment from 'moment'

import 'prismjs'
import 'prismjs/components'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-batch'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-bison'
import 'prismjs/components/prism-bnf'
import 'prismjs/components/prism-cmake'
import 'prismjs/components/prism-coffeescript'
// import 'prismjs/components/prism-core'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-css-extras'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-dns-zone-file'
import 'prismjs/components/prism-ebnf'
import 'prismjs/components/prism-flow'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-groovy'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-http'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike'
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-jq'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-json5'
import 'prismjs/components/prism-jsonp'
import 'prismjs/components/prism-jsstacktrace'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-prolog'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-protobuf'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-rest'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/themes/prism.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMarkdown from 'vue-markdown/src/VueMarkdown'

Vue.component('vue-markdown', VueMarkdown);

moment.locale('ko')
Vue.use(VueMoment, { moment })

import {
  TemplateLayouts
} from '@vuelog/front'

import TopNav from './TopNav.vue'
import Header from './Header.vue'
import PostList from './GlobalMain.vue'
import Post from './Post.vue'
import Footer from './Footer.vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

export default {
  topNavComponent: TopNav,
  headerComponent: Header,
  mainPageComponent: PostList,
  postListComponent: PostList,
  postComponent: Post,
  footerComponent: Footer
} as TemplateLayouts
