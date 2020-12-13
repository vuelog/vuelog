<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <p class="copyright text-muted">
            Copyright &copy; Vuelog 2020
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>

</style>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ComponentProps, PostProp, SiteProp } from '@vuelog/front';

@Component({

})
export default class Footer extends Vue implements ComponentProps {
  @Prop() public site!: SiteProp;
  @Prop() public post!: PostProp;
}
</script>
