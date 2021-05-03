<template>
  <div ref="goodsPage">
    <div ref="goods">
      <van-row class="goods">
        <van-col span="5" class="good-menu">
          <ul class="menu-ul ">
            <li
              :class="{
                'meun-item': true,
                'menu-item-focus': current === index,
              }"
              v-for="(item, index) in goods"
              :key="index"
              @click="handleMenu(index)"
            >
              <div class="menu-item-name">{{ item.name }}</div>
            </li>
          </ul>
        </van-col>

        <van-col class="good-info" span="19">
          <div class="good-wrapper" ref="wrapper">
            <ul class="good-variety scroll-content" ref="good">
              <li
                class="good-variety-li"
                v-for="(good, index) in goods"
                :key="index"
              >
                <div class="good-title">{{ good.name }}</div>
                <ul class="food-ul ">
                  <li
                    class="food-li"
                    v-for="(food, foodIndex) in good.foods"
                    :key="foodIndex"
                    @click="HandleToDetail(food)"
                  >
                    <img
                      class="food-icon"
                      :src="food.icon"
                      style="display:block;width:57px;height:57px;"
                    />
                    <div class="food-info">
                      <div class="food-name">{{ food.name }}</div>
                      <div class="food-des">{{ food.description }}</div>
                      <div class="food-sale">月销售{{ food.sellCount }}份</div>
                      <div class="food-price">
                        ￥{{ food.price }}元
                        <div class="food-btn">
                          <transition name="van-slide-right">
                            <van-icon
                              v-show="getCount(foodList, food.name)"
                              @click.stop="handleReduce(food)"
                              name="minus"
                              color="#1989fa"
                              size="18px"
                            />
                          </transition>

                          <div
                            style="color: black"
                            v-show="getCount(foodList, food.name)"
                          >
                            {{ getCount(foodList, food.name) }}
                          </div>

                          <van-icon
                            @click.stop="handleAdd(food)"
                            name="plus"
                            color="#1989fa"
                            size="18px"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </van-col>
      </van-row>
    </div>

    <good-detail
      :foodDetail="foodDetail"
      :status="show"
      @statusChange="statusChange"
    />

    <div
      class="shopping"
      ref="shopping"
      style="z-index: 2800;width: 100%;background:#f3f5f7;position:fixed; bottom:0"
    >
      <good-shopping @foodChange="foodChange" />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import GoodShopping from '@/components/Goods/GoodShopping'
import GoodDetail from '@/components/Goods/GoodDetail'
import { mapMutations, mapState } from 'vuex'
import {
  FOOD_ADD,
  FOOD_REDUCE,
  FOOD_RESET,
} from '@/store/goods/goodsMutationsType'

export default {
  name: 'Goods',
  components: {
    GoodShopping,
    GoodDetail,
  },
  data() {
    return {
      goods: [],
      active: true,
      liHeight: [],
      scrollY: 0,
      current: 0,
      visible: false,
      show: false,
      foodDetail: {},
    }
  },
  computed: {
    ...mapState('goods', {
      foodList: (state) => state.foodList,
    }),
  },
  methods: {
    ...mapMutations('goods', {
      FOOD_ADD,
      FOOD_REDUCE,
      FOOD_RESET,
    }),

    // 获取vuex的foodList中对应的count并渲染。备注一下，通过vuex的getters会更方便，这里只是做一种尝试
    getCount(foodList, name) {
      let arr = foodList.filter((item, index) => {
        if (item.name === name) {
          return true
        }
      })
      if (!arr.length) {
        return false
      } else {
        this.foodCount = arr[0].count
        return arr[0].count
      }
    },

    //点击进入详情页
    HandleToDetail(food) {
      this.foodDetail = food
      this.show = true
    },

    //点击增加
    handleAdd(food) {
      this.visible = true

      this.FOOD_ADD({ name: food.name, image: food.image, price: food.price })
    },

    //点击减少
    handleReduce(food) {
      this.FOOD_REDUCE({ name: food.name })
    },

    //清空选择的food
    handleReset(food) {
      this.foodDetail = food
    },

    //监听food-shopping组件对于food的增减
    foodChange(payload) {
      let food = payload.food
      if (payload.status === 'add') {
        this.FOOD_ADD({
          name: food.name,
          image: food.image,
          price: food.price,
        })
      } else if (payload.status === 'reduce') {
        this.FOOD_REDUCE({ name: food.name })
      } else {
        this.FOOD_RESET()
      }
    },

    //监听food-detail组件事件
    statusChange(payload) {
      if (payload.status === 'close') {
        this.show = false
      } else if (payload.status === 'add') {
        this.handleAdd(payload.food)
      } else {
        this.handleReduce(payload.food)
      }
    },

    //点击侧边菜单处理，将当前菜单索引获取后对current与scrollY进行处理。这里使用better-scroll联动会更好。此处只是做一个尝试。
    handleMenu(index) {
      //多移动一个像素，最终滚动的距离就会大于 this.scrollY+=...,从而可以正确得到current的值
      this.scrollY = 1
      for (let i = 0; i <= index; i++) {
        this.scrollY +=
          this.liHeight[i - 1] === undefined ? 0 : this.liHeight[i - 1]
      }
      this.scroll.scrollTo(0, -this.scrollY, 300)
    },
    //初始化better-scroll
    initFoodScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollbar: true, //滚动条样式
          // pullDownRefresh: true, //配置顶部下拉的距离来决定刷新时机
          observeDOM: true,
          click: true, //开启点击事件
          probeType: 3, //监测实时滚动
        })
        this.scroll.on('scroll', this._getCurrent)
      })
    },

    //获取每个good-variety-li的高度
    getFoodHeigh() {
      this.$nextTick(() => {
        let lis = this.$refs.good.children
        // this.scrollDOM = lis
        for (let li of lis) {
          this.liHeight.push(li.clientHeight)
        }
      })
    },
    //获取current
    _getCurrent(pos) {
      let index,
        total = 0
      for (let i = 0; i < this.liHeight.length; i++) {
        index = this.liHeight[i]
        total += index
        if (total + pos.y >= 0) {
          return (this.current = i)
        }
      }
    },

    //设置goodPage高度
    setHeight() {
      let goodsPageHeight = this.$refs.goodsPage.clientHeight
      let shoppingHeight = this.$refs.shopping.clientHeight
      this.$refs.goods.style.height = (
        goodsPageHeight -
        shoppingHeight +
        'px'
      ).toString()
    },
  },
  async created() {
    let goodsRes = await this.$http('goods')
    this.goods = goodsRes.data
    this.initFoodScroll()
    this.getFoodHeigh()
  },
  mounted() {
    this.$nextTick(() => {
      this.setHeight()
    })
  },
}
</script>

<style lang="scss" scoped>
.goods {
  position: relative;
  height: 100%;
  .good-menu {
    height: 100%;
    background: rgba(243, 245, 247, 1);
    overflow-y: scroll;
    .menu-ul {
      display: flex;
      flex-direction: column;
      .meun-item {
        height: 50px;
        padding-left: 5px;
        position: relative;
        .menu-item-name {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .menu-item-focus {
        border-left: 3px solid red;
        background: #fff;
        border-radius: 3px;
      }
    }
  }
  .good-info {
    height: 100%;
    .good-wrapper {
      height: 100%;
      overflow: hidden;
      .good-title {
        background: #ccc;
        border-left: 2px solid rgba(66, 65, 65, 0.5);
        padding-left: 10px;
      }
      .food-li {
        border-bottom: 1px solid rgba(233, 233, 233, 0.8);
        display: flex;
        align-items: flex-start;
        padding: 10px 0;
        .food-icon {
          margin: 0 10px 0 10px;
        }
        .food-info {
          width: 100%;
          font-size: 12px;
          color: gray;
          .food-name {
            color: #000;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .food-des {
            margin-bottom: 1px;
            max-width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .food-sale {
          margin-bottom: 5px;
        }
        .food-price {
          font-size: 16px;
          color: red;
          display: flex;
          justify-content: space-between;
          .food-btn {
            font-size: inherit;
            display: inline-block;
            display: flex;
            align-items: center;
            padding: 0 10px;
          }
        }
      }
    }
  }
}
</style>
