<template>
  <div>
    <div class="goods">
    <div class="menu-wrapper" ref="menuScroll">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
          @click="selectMenu(index, $event)"><!--
     --><span class="name border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div><!--
 --><div class="foods-wrapper" ref="foodsScroll">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click.prevent="selectFood(food, $event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="sellcount">月售{{food.sellCount}}份</span><!--
                  --><span class="ratings">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><!--
                  --><span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
    <div class="shopcart">
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
        @increment="countInc" @decrease="countDec"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import food from 'components/food/food.vue';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height0 = this.listHeight[i];
          let height1 = this.listHeight[i + 1];
          if (!height1 || this.scrollY >= height0 && this.scrollY < height1) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._caculateHeight();
        });
      });
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsScroll, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
          // console.log(this.scrollY);
        });
      },
      _caculateHeight () {
        let foodList = this.$refs.foodsScroll.getElementsByClassName('food-list-hook');
        // console.log('foodlist   ' + foodList[0].clientHeight);
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        return this.listHeight;
      },
      selectMenu (index, event) {
        console.log('click');
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsScroll.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        // console.log(el);
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        console.log(this.selectedFood);
        this.$refs.food.show();
      },
      countInc () {

      },
      countDec () {

      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    display flex
    position absolute
    top 176px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          font-weight 700
          color black
          background white
          .name
            border-1px(rgba(255,255,255,1))
        .name
          display table-cell
          width 56px
          height 14px
          font-size 12px
          color rgb(24,20,20)
          font-weight 200
          line-height 14px
          vertical-align middle
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-1px(rgba(255,255,255,1))
          .icon
            display inline-block
            width 12px
            height 12px
            vertical-align top
            margin-right 2px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex 1
      .food-list
        .title
          padding-left 14px
          height 26px
          line-height 26px
          border-left 2px solid #d9dde1
          font-size 12px
          color rgb(147,153,159)
          background #f3f5f7
        .food-item
          display flex
          margin 18px
          padding-bottom 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-1px(rgba(255,255,255,1))
            margin-bottom 0
          .icon
            flex 0 0 57px
            margin-right 10px
          .content
            flex 1
            position: relative;
            .name
              margin 2px 0 8px 0
              font-size 14px
              line-height 14px
              height 14px
              color rgb(7,17,27)
            .desc
              font-size 10px
              color rgb(147,153,159)
              line-height 10px
            .extra
              font-size 10px
              color rgb(147,153,159)
              font-weight 700
              line-height 24px
              .sellcount
                margin-right 12px
            .price
              font-weight 700
              line-height 24px
              .now
                font-size 14px
                margin-right 8px
                color rgb(240,20,20)
              .old
                font-size 10px
                color rgb(147,153,159)
                text-decoration line-through
            .cartcontrol-wrapper
                display block
                position absolute
                right 0
                bottom 0

</style>
