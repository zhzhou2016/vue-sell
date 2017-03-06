
<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="head">
        <h1 class="name">{{seller.name}}</h1>
        <div class="detail"><!--
        --><div class="star-wrapper"><!--
        --><star class="star" :size="36" :score="seller.score"></star>
          </div>
          <span class="ratingCount">({{seller.ratingCount}})</span>
          <span class="sellCount">月售{{seller.sellCount}}单</span>
        </div>
        <div class="info">
          <div class=" info-item minPrice">
            <div class="prefix">起送价</div>
            <span class="price">{{seller.minPrice}}</span>
            <span class="unit">元</span>
          </div>
          <div class="info-item deliveryPrice">
            <div class="prefix">商家配送</div>
            <span class="price">{{seller.deliveryPrice}}</span>
            <span class="unit">元</span>
          </div>
          <div class="info-item deliveryTime">
            <div class="prefix">平均配送时间</div>
            <span class="price">{{seller.deliveryTime}}</span>
            <span class="unit">分钟</span>
          </div>
        </div>
      </div>
      <div class="collect">
        <span class="love icon-favorite"></span>
        <div class="text">收藏</div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <span class="bulletin-info">{{seller.bulletin}}</span>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item, index) in seller.supports">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="support">{{seller.supports[index].description}}</span>
        </li>
      </ul>
      <split></split>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      }
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      star,
      split
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .seller
    .seller-content
      position relative
    .head
      padding 18px
      .name
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .detail
        /*display inline-block*/
        margin-top 8px
        font-size 0
        border-1px(rgba(7,17,27,0.1))
        padding-bottom 18px
        .star-wrapper
          display inline-block
          vertical-align top
          margin-right 8px
        .ratingCount
          display inline-block
          vertical-align top
          margin-right 12px
          line-height 18px
          font-size 10px
          color rgb(77,85,93)
        .sellCount
          display inline-block
          vertical-align top
          line-height 18px
          font-size 10px
          color rgb(77,85,93)
      .info
        display flex
        padding 18px 0 0 0
        .info-item
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border-right none
          .prefix
            line-height 10px
            margin-bottom 4px
            font-size 10px
            color rgb(147,153,159)
          .price
            font-size 24px
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
          .unit
            font-size 10px
            font-weight 200
            color rgb(7,17,27)
            line-height 24px
    .collect
      position absolute
      top 18px
      right 18px
      .love
        line-height 24px
        margin-bottom 4px
        font-size 24px
        color rgb(240,20,20)

      .text
        font-size 10px
        color rgb(77,85,93)
        line-height 10px
    .bulletin
      padding 18px 18px 0 18px
      .title
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .bulletin-info
        display block
        margin 8px 0 0 0
        padding-left 12px
        padding-right 12px
        padding-bottom 16px
        line-height 24px
        font-size 12px
        font-weight 200
        color rgb(240,20,20)
        border-1px(rgba(7,17,27,.1))
    .supports
      padding 0 18px
      .support-item
        border-1px(rgba(7,17,27,.1))
        padding 16px 12px
        &:last-child
          border-1px(rgba(7,17,27,0))
        .support
          display inline-block
          text-align center
          font-size 12px
          line-height 16px
          color rgb(7,17,27)
        .icon
          display inline-block
          vertical-align top
          width 16px
          height 16px
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')

</style>
