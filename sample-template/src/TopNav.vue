<template>
  <b-navbar toggleable="lg" class="navbar navbar-expand-lg navbar-light fixed-top mainNav" :class="{'navbar-shrink': navbarShrink}" ref="mainNav" >
    <b-navbar-brand class="navbar-brand" :href="$vuelog.site.baseUrl">{{ $vuelog.site.config.title }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" class="navbar-toggler navbar-toggler-right">
      Menu
      <i class="fas fa-bars"></i>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="nav-link" href="#">AAAA</b-nav-item>
        <b-nav-item class="nav-link" href="#">BBBB</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>
<style scoped>
.mainNav {
  /*position: absolute;*/
  /*border-bottom: 1px solid #e9ecef;*/
  /*background-color: white;*/
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.mainNav .navbar {

}

.mainNav .navbar-brand {
  font-weight: 800;
  color: #fff;
}

.mainNav .navbar-toggler {
  font-size: 12px;
  font-weight: 800;
  padding: 13px;
  text-transform: uppercase;
  color: #343a40;
}

.mainNav .navbar-nav > li.nav-item > a {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.mainNav .nav-link {
  color: #fff;
}

@media only screen and (min-width: 992px) {
  .mainNav {
    transition: background-color 0.2s;
    /* Force Hardware Acceleration in WebKit */
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .mainNav.is-fixed {
    /* when the user scrolls down, we hide the header right above the viewport */
    position: fixed;
    top: -67px;
    transition: transform 0.2s;
    border-bottom: 1px solid white;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .mainNav.is-fixed .navbar-brand {
    color: #212529;
  }
  .mainNav.is-fixed .navbar-brand:focus, .mainNav.is-fixed .navbar-brand:hover {
    color: #0085A1;
  }
  .mainNav.is-fixed .navbar-nav > li.nav-item > a {
    color: #212529;
  }
  .mainNav.is-fixed .navbar-nav > li.nav-item > a:focus, .mainNav.is-fixed .navbar-nav > li.nav-item > a:hover {
    color: #0085A1;
  }
  .mainNav.is-visible {
    /* if the user changes the scrolling direction, we show the header */
    transform: translate3d(0, 100%, 0);
  }
}

.mainNav.navbar-shrink {
  background-color: #fff;
}
.mainNav.navbar-shrink .navbar-brand {
  color: #343a40;
}
.mainNav.navbar-shrink .nav-link {
  color: #000000;
  /*padding: 1.5rem 1.5rem 1.25rem;*/
  border-bottom: 0.25rem solid transparent;
}
.mainNav.navbar-shrink .nav-link:hover {
  color: #64a19d;
}
.mainNav.navbar-shrink .nav-link:active {
  color: #467370;
}
.mainNav.navbar-shrink .nav-link.active {
  color: #64a19d;
  outline: none;
  border-bottom: 0.25rem solid #64a19d;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ComponentProps, SiteProp, PostProp } from '@vuelog/front';

@Component({

})
export default class TopNav extends Vue implements ComponentProps {
  @Prop() public site!: SiteProp;
  @Prop() public post!: PostProp;

  private navbarShrink: boolean = false;

  mounted() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.handleScroll();
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.navbarShrink = (window.scrollY > 100);
  }
}
</script>
