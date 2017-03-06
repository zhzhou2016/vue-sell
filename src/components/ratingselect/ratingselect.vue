<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2,$event)" class="block positive" :class="{'active': selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active': selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1,$event)" class="block negative"  :class="{'active': selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
      <span class="icon-keyboard_arrow_right"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 3;

  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positive () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      toggleContent (event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('toggle');
      },
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('select', type);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        font-size 12px
        line-height 32px
        border-radius 1px
        margin-right 8px
        color rgb(77,85,93)
        &.active
          color white
        &.positive
          color white
          // background rgb(0,160,220)
          background rgba(0,160,220,0.4)
          &.active
            background rgb(0,160,220)
        &.negative
          background rgba(77,85,93,0.2)
          &.active
            background rgb(77,85,93)
        .count
          font-size 8px
          margin-left 2px
          line-height 16px
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7,17,27,0.1)
      color rgb(147,153,159)
      font-size 0
      &.on
        .icon-keyboard_arrow_right
          color #00c850
      .icon-keyboard_arrow_right
        display inline-block
        font-size 24px
        margin-right 4px
        vertical-align top
      .text
        display inline-block
        font-size 12px
        line-height 24px
        vertical-align top

</style>
