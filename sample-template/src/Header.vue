<template>
  <header class="masthead" style="background-image: url('https://startbootstrap.github.io/startbootstrap-clean-blog/img/home-bg.jpg')">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="site-heading">
            <h1>{{ $vuelog.site.config.params && $vuelog.site.config.params.headerTitle }}</h1>
            <span class="subheading">{{ $vuelog.site.config.params && $vuelog.site.config.params.headerMessage }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<style>
.vuelog-root {
  width: 100%;
  height: 100%;
  font-size: 100%;
  margin: 0;
  padding: 0;
  font-family: "raleway", sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  word-wrap: break-word;
  -ms-word-wrap: break-word;
}
</style>
<style lang="scss" scoped>
@import '_variables.scss';
@import '_mixins.scss';

// Styling for the masthead
header.masthead {
  // TIP: Background images are set within the HTML using inline CSS!
  background: no-repeat center center;
  background-color: $gray-600;
  background-attachment: scroll;
  position: relative;
  @include background-cover;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $gray-900;
    opacity: 0.5;
  }
  .page-heading,
  .post-heading,
  .site-heading {
    padding: 200px 0 150px;
    color: white;
    @media only screen and (min-width: 768px) {
      padding: 200px 0;
    }
  }
  .page-heading,
  .site-heading {
    text-align: center;
    h1 {
      font-size: 50px;
      margin-top: 0;
    }
    .subheading {
      font-size: 24px;
      font-weight: 300;
      line-height: 1.1;
      display: block;
      margin: 10px 0 0;
      @include sans-serif-font;
    }
    @media only screen and (min-width: 768px) {
      h1 {
        font-size: 80px;
      }
    }
  }
  .post-heading {
    h1 {
      font-size: 35px;
    }
    .meta,
    .subheading {
      line-height: 1.1;
      display: block;
    }
    .subheading {
      font-size: 24px;
      font-weight: 600;
      margin: 10px 0 30px;
      @include sans-serif-font;
    }
    .meta {
      font-size: 20px;
      font-weight: 300;
      font-style: italic;
      @include serif-font;
      a {
        color: $white;
      }
    }
    @media only screen and (min-width: 768px) {
      h1 {
        font-size: 55px;
      }
      .subheading {
        font-size: 30px;
      }
    }
  }
}
</style>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ComponentProps, PostProp, SiteProp } from '@vuelog/front';
@Component({

})
export default class Header extends Vue implements ComponentProps {
  @Prop() public site!: SiteProp;
  @Prop() public post!: PostProp;
}
</script>
