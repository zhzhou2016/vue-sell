<template>
  <div v-show="showFlag" class="food" ref="showIt">
    <div>
    <div class="header">
      <div class="pic">
        <img :src="food.image">
      </div>
      <div @click="hide" class="back">
        <i class="icon-add_circle"></i>
      </div>
    </div>
    <div class="content">
      <h1 class="title">{{food.name}}</h1>
      <div class="detail">
        <span class="sell-count">月售{{food.sellCount}}</span>
        <span class="rating">好评率{{food.rating}}</span>
      </div>
      <div class="price">
        <span class="now">￥{{food.price}}</span>
        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartControl-wrapper">
        <cartControl :food="food"></cartControl>
      </div>
    </div>
    <split></split>
    <div v-show="food.info" class="info">
      <h1 class="title">商品信息</h1>
      <p class="text">{{food.info}}</p>
    </div>
    <split v-show="food.info"></split>
    <div class="rating">
      <h1 class="title">商品评价</h1>
      <ratingselect @toggle="toggleContent" @select="selectRating"
        :select-type="selectType" :only-content="onlyContent"
        :desc="desc" :ratings="food.ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="food.ratings && food.ratings.length">
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
            <div class="user">
              <span class="name">{{rating.username}}</span>
              <img class="avatar" width="12" height="12" :src="rating.avatar">
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
            <p class="text">
              <span :class="{'icon-arrow_lift':rating.rateType===0,
              'icon-check_circle':rating.rateType===1}"></span><span>{{rating.text}}</span>
            </p>
          </li>
        </ul>
        <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">
          暂无评价
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartControl from 'components/cartcontrol/cartcontrol.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue'
  import {formatDate} from 'common/js/data';
  const All = 2;
  // const POSTIVE = 0;
  // const NEGATIVE = 1;
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: All,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    computed: {

    },
    methods: {
      show () {
        this.showFlag = true;
        this.selectType = All;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.showIt, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide () {
        this.showFlag = false;
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent;
        // this.selectType = 0;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      selectRating (type, event) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === All) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formateDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartControl,
      split,
      ratingselect
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 9
    width 100%
    background #fff
    .header
      position relative
      width 100%
      height 0
      padding-top 100%
      .pic
        position absolute
        top 0
        width 100% height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-add_circle
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        line-height 14px
      .detail
        margin-top 8px
        font-size 0
        .sell-count
          display inline-block
          margin-right 12px
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
        .rating
          display inline-block
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
      .price
        font-size 0
        margin-top 18px
        vertical-align middle
        .now
          display inline-block
          margin-right 12px
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          line-height 24px
        .old
          display inline-block
          font-size 10px
          font-weight 700
          color rgb(147,153,159)
          line-height 24px
    .cartControl-wrapper
      display block
      position absolute
      right 16px
      bottom 18px
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        fonnt-size 14px
        color rgb(7,17,27)
      .text
        font-size 12px
        line-height 24px
        padding 0 8px
        color rgb(77,85,93)
    .rating
       padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        fonnt-size 14px
        color rgb(7,17,27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position absolute
            right 0
            top 16px
            font-size 0
            line-height 12px
            .name
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147,153,159)
              margin-right 6px
            .avatar
              display inline-block
              vertical-align top
              width 12px
              height 12px
              border-radius 50%
          .time
            margin-bottom 6px
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
          .text
            line-height 16px
            font-size 12px
            color: rgb(7, 17, 27)
            .icon-arrow_lift, .icon-check_circle
              line-height 16px
              font-size 12px
            .icon-arrow_lift
              color rgb(0,160,220)
            .icon-check_circle
              color rgb(147,153,159)
        .no-ratings
          padding 16px 0 20px 0
          font-size 12px
          color rgb(147,153,159)
</style>
