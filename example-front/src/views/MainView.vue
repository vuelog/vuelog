<template>
  <AppView>
    <template v-slot:custom:default>
      <div class="custom_default">
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
        <p>MY CUSTOM VIEW</p>
      </div>
    </template>
  </AppView>
</template>
<style scoped lang="scss">
.custom_default {
  background-color: #ffc107;
}
</style>
<script lang="ts">
import { AppView } from '@vuelog/front';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    AppView
  }
})
export default class MainView extends Vue {
}
</script>
