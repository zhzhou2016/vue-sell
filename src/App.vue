<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评分</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((rep) => {
        // rep.json();
        this.seller = rep.body.data;
        console.log(rep.body.data);
      });
    },
    components: {
      'v-header': header
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      //flex-direction: column
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display block
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(240,0,0)
</style>
