<template>
<div class="shopcart">
  <div class="content" @click="toggleList">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'active':totalPrice>0}">
          <i class="icon icon-close"></i>
        </div>
        <div  v-show="listShow" class="count">{{totalCount}}</div>
      </div>
      <div class="price">￥{{totalPrice}}元</div>
      <div class="desc">另需配送费{{deliveryPrice}}元</div>
    </div>
    <div class="content-right">
      <div class="pay" :class="payClass">
        {{payDesc}}
      </div>
    </div>
  </div>
  <div v-show="!fold" class="shopcart-list">
    <div class="list-header">
      <h1 class="title">购物车</h1>
      <span class="empty" @click="empty">清空</span>
    </div>
    <div class="list-content" ref="listContent">
      <ul>
        <li class="shopcart-food" v-for="food in selectFoods">
          <span class="name">{{food.name}}</span>
          <div class="price"><span>￥{{food.price * food.count}}</span></div>
          <div class="cartControl-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import cartControl from 'components/cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 10,
              count: 2
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 6
      },
      minPrice: {
        type: Number,
        default: 9
      }
    },
    data () {
      return {
        fold: true
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        } else {
          return 'no';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      }
    },
    components: {
      cartControl
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .shopcart
    display block
    position fixed
    bottom 0
    left 0
    height 48px
    width 100%
    background #141d27
    z-index: 20
    .content
      display flex
      .content-left
        flex 1
        font-size 0
        .logo-wrapper
          position: relative
          display inline-block
          left 12px
          top -10px
          box-sizing border-box
          width 56px
          height 56px
          border-radius 50%
          padding 6px
          margin 0 12px
          vertical-align top
          background #141d27
          .logo
            position relative
            width 100%
            height 100%
            text-align center
            border-radius 50%
            background #2b343c
            &.active
              background rgb(0,160,220)
              .icon
                color white
            .icon
              font-size 24px
              line-height 44px
              color #80858a
          .count
            position absolute
            width 24px
            height 18px
            border-radius 16px
            top 0
            right 0
            font-size 9px
            line-height 16px
            text-align center
            background red
            color white
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          box-sizing border-box
          margin-top 12px
          padding-right 12px
          font-size 16px
          color rgb(255,255,255,0.4)
          line-height 24px
          font-weight 700
          border-right 1px solid rgba(255,255,255,.1)
        .desc
          display: inline-block
          margin-left 12px
          font-size 16px
          color rgba(255,255,255,0.4)
          line-height:48px
      .content-right
        .pay
          flex 0 0 120px
          padding 0 8px
          width 105px
          height 48px
          font-size 14px
          font-weight 600
          text-align center
          color rgba(255,255,255,0.4)
          line-height 48px
          background #2b333b
          &.enough
            background #00b43c
            color white
    .shopcart-list
      position absolute
      bottom 48px
      left 0
      z-index: -1
      max-height 305px
      width 100%
      .list-header
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        height 40px
        padding 0 18px
        background #f3f5f7
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
          line-height 40px
        .empty
          float right
          font-size 12px
          color rgb(0,160,220)
          line-height 40px
      .list-content
        padding 0 12px
        max-height 217px
        background #fff
        overflow hidden
        .shopcart-food
          position relative
          width 100%
          background #fff
          height 48px
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            font-size 14px
            color rgb(7,17,27)
            line-height 24px
          .price
            position absolute
            right 90px
            bottom 12px
            font-size 20px
            font-weight 700
            line-height 24px
            color: rgb(240,20,20)
          .cartControl-wrapper
            position absolute
            right 0
            bottom 6px


</style>
