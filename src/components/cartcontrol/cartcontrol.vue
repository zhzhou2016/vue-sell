<template>
  <div class="cartcontrol">
    <div v-show="food.count>0" class="cart-decrease" @click.stop.prevent="decrease($event)"><span class="icon-shopping_cart"></span>
    </div>
    <div v-show="food.count>0" class="cart-count">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="increment($event)">
      <span class="icon-thumb_down"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      increment () {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('increment');
      },
      decrease () {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
        this.$emit('decrease');
      }
    },
    created () {
      console.log(this.food);
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    text-align center
    .cart-decrease
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
      background: #fff
    .cart-count
      display: inline-block
      vertical-align top
      height 36px
      /*width 12px*/
      font-size 10px
      line-height 36px
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
      background: #fff
</style>
