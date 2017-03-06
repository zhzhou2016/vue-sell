<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar"/>
        </div><!--
      --><div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div v-if="seller.description" class="description">
            <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="supports-count" @click="showIt">
          <span class="count">{{seller.supports.length}}个</span><!--
          --><i class="icon icon-arrow-right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showIt">
        <span class="bulletin-logo"></span><!--
        --><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon icon-arrow-right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <div v-show="showDetail" class="detail">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="2.6"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item, index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
          </div>
        </div>
        <div class="delete" @click="hiddenIt">
          <i class="icon icon-remove"></i>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        showDetail: false
      }
    },
    computed () {

    },
    methods: {
      showIt () {
        this.showDetail = true
      },
      hiddenIt () {
        this.showDetail = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      star
    }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
.header
  position relative
  color #fff
  overflow hidden
  .content-wrapper
    padding 24px 12px 18px 24px
    position relative
    .avatar
      display inline-block
      border-radius 2px
    .content
      display inline-block
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          width 30px
          height 18px
          vertical-align top
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          font-weight bold
          line-height 18px
      .description
          font-size 12px
          line-height 12px
          margin-bottom 10px
      .support
        display inline-block
        font-size 10px
        line-height 12px
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
    .supports-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background-color rgba(7,17,27,0.2)
      text-align center
      .count
        font-size 10px
        line-height 24px
      .icon
        vertical-align top
        margin-left 2px
        font-size 10px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background-color rgba(7,17,27,0.2)
    .bulletin-logo
      display inline-block
      width 22px
      height 12px
      // vertical-align top
      background-repeat no-repeat
      bg-image('bulletin')
      background-size 22px 12px
    .bulletin-text
      margin 0 4px
      font-size 10px
      vertical-align top
    .icon
      position absolute
      right 12px
      top: 0
      font-size 20px
      line-height 28px
      vertical-align top
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index: -1
    filter blur(10px)
  .detail
    position fixed
    z-index 100
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    background-color rgba(7,17,27,0.5)
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        .star-wrapper
          margin 16px auto 0 auto
          text-align center
        .title
          display flex
          width 80%
          margin 30px auto 24px auto
          .line
            flex 1
            position relative
            top -6px
            border-bottom 2px solid rgba(255,255,255,0.2)
          .text
            padding 0 12px
            font-size 16px
            font-weight 700
        .supports
          width 80%
          margin 22px auto
          .support-item
            padding 0 12px
            font-size 0
            margin-bottom 12px
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              line-height 12px
              font-size 12px
              color #ffffff
        .bulletin
          width 80%
          height 200px
          margin 22px auto
          .content
            padding 0 12px
            line-height 24px
            font-size 12px
    .delete
      position relative
      margin-top -64px
      text-align center

</style>
