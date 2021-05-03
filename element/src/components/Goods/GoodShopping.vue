<template>
  <div class="shopping">
    <div class="shopping-bar" @click="show = Boolean(foodCount)">
      <div class="shopping-info">
        <div :class="{ 'shopping-log': true, 'shopping-log-focus': foodPay }">
          <van-badge
            :content="foodCount"
            :color="foodCount === 0 ? 'gray' : ''"
          >
            <van-icon name="shopping-cart" color="#fff" size="50px" />
          </van-badge>
        </div>
        <div class="shopping-price">
          <div class="shopping-pay">￥{{ foodPay }}</div>
          <div class="shopping-transport">另需配送费20元</div>
        </div>
      </div>
      <div
        :class="{
          'shopping-payment': true,
          'shopping-payment-focus': hasSend === '去结算',
        }"
      >
        {{ hasSend }}
      </div>
    </div>

    <van-action-sheet
      v-model="show"
      description
      safe-area-inset-bottom
      duration=".1"
    >
      <div class="shopping-header">
        <div class="shopping-header-info ">
          <div class="shopping-title">购物车</div>
          <div class="shopping-reset" @click="handleReset">
            清空
          </div>
        </div>
      </div>

      <div class="shopping-food ">
        <ul class="content">
          <li class="food-li" v-for="(food, index) in foodList" :key="index">
            <div class="food-li-img">
              <img
                :src="food.image"
                style="width: 56px;height: 56px; border-radius:5px;"
              />
            </div>
            <div class="food-li-name">{{ food.name }}</div>
            <div class="food-li-btn">
              <van-icon
                name="minus"
                color="#1989fa"
                size="18px"
                @click="handleReduce(food)"
              />
              <div class="food-li-count">{{ food.count }}</div>
              <van-icon
                name="plus"
                color="#1989fa"
                size="18px"
                @click="handleAdd(food)"
              />
            </div>
          </li>
        </ul>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { FOOD_ADD, FOOD_REDUCE } from '@/store/goods/goodsMutationsType'
export default {
  name: 'GoodShopping',
  data() {
    return {
      show: false,
      sendPay: 20,
    }
  },
  watch: {},
  computed: {
    ...mapState('goods', {
      foodList: (state) => state.foodList,
    }),

    //计算当前购物车选中的food数量
    foodCount() {
      let totalCount = 0
      this.foodList.length === totalCount
        ? ''
        : (totalCount = this.foodList.reduce(
            (total, current) => total + current.count,
            0
          ))
      return totalCount
    },

    //计算当前购物车的food总价
    foodPay() {
      let totalPay = 0
      this.foodList.length === totalPay
        ? ''
        : (totalPay = this.foodList.reduce(
            (total, current) => total + current.price * current.count,
            0
          ))
      return totalPay
    },

    //计算是否满足配送价格
    hasSend() {
      let current = this.sendPay - this.foodPay
      return current > 0 ? '还差￥' + current + '起送' : '去结算'
    },
  },
  methods: {
    ...mapMutations('goods', {
      FOOD_ADD,
      FOOD_REDUCE,
    }),
    handleAdd(food) {
      this.$emit('foodChange', { status: 'add', food })
    },
    handleReduce(food) {
      this.$emit('foodChange', { status: 'reduce', food })
      this.foodList.length === 0 ? (this.show = false) : ''
    },
    handleReset() {
      this.show = false
      this.$emit('foodChange', { status: 'reset' })
    },
  },
}
</script>

<style lang="scss" scoped>
.shopping {
  // z-index: inherit;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  .shopping-bar {
    display: flex;
    height: 56px;
    box-sizing: border-box;
    z-index: inherit;
    align-self: baseline;

    .shopping-info {
      z-index: inherit;
      background: rgb(228, 220, 220);
      display: flex;
      flex: 3;
      .shopping-log {
        position: relative;
        width: 56px;
        height: 56px;
        background: #cccc;
        text-align: center;
      }
      .shopping-log-focus {
        background: #1989fa;
      }

      .shopping-price {
        display: flex;
        line-height: 56px;
        .shopping-pay {
          padding: 0 10px;
          border-right: 1px solid #ccc;
          font-weight: bold;
        }
        .shopping-transport {
          padding: 0 10px;

          flex: 1;
        }
      }
    }

    .shopping-payment {
      z-index: inherit;
      flex: 1;
      text-align: center;
      line-height: 56px;
      background: #72a6da;
    }
    .shopping-payment-focus {
      background: #00b43c;
      color: #fff;
      font-weight: 700;
    }
  }
  .van-action-sheet {
    z-index: inherit;

    .shopping-header {
      position: fixed;
      width: 100%;
      height: 40px;
      background: #fff;
      z-index: 999;
      .shopping-header-info {
        height: 40px;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
        position: relative;
        .shopping-title {
          display: inline-block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 20px;
        }
        .shopping-reset {
          display: inline-block;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 15px;
          right: 0;
          color: red;
        }
      }
    }

    .shopping-food {
      z-index: inherit;
      .content {
        padding: 45px 16px 60px;
        .food-li {
          display: flex;
          justify-content: space-between;

          .food-li-name {
          }
          .food-li-name {
            display: flex;
            align-items: center;
          }

          .food-li-btn {
            display: flex;
            align-items: center;
            .food-li-count {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
