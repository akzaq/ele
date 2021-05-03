<template>
  <div ref="wrapper">
    <van-popup
      class="content"
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      @close="handleClose"
    >
      <div class="detail-banner">
        <img :src="foodDetail.image" style="width: 100%;" />
      </div>

      <div class="detail-header">
        <div class="food-name">{{ foodDetail.name }}</div>
        <div class="food-sell">
          月售{{ foodDetail.sellCount }}份，好评率{{ foodDetail.rating }}%
        </div>
        <div class="detail-price">
          <div class="food-price">￥{{ foodDetail.price }}</div>
          <div class="food-action">
            <div class="action-default" v-if="!foodCount" @click="handleBtn">
              加入购物车
            </div>
            <transition v-else name="van-slide-right">
              <div class="action-move">
                <van-icon
                  name="minus"
                  color="#1989fa"
                  size="18px"
                  @click="handleReduce"
                />
                <div style="height:100%; font-size:18px;">
                  {{ foodCount }}
                </div>
                <van-icon
                  name="plus"
                  color="#1989fa"
                  size="18px"
                  @click="handleAdd"
                />
              </div>
            </transition>
          </div>
        </div>

        <div class="detail-info">{{ foodDetail.info }}</div>
      </div>

      <div class="detail-ratings">
        <div class="ratings-title" style="font-weight: bold">商品评价</div>
        <v-ratings :ratings="this.foodDetail.ratings">
          <template v-slot:btn1>全部 </template>
          <template v-slot:btn2>推荐 </template>
          <template v-slot:btn3>吐槽</template>
        </v-ratings>
      </div>
    </van-popup>
  </div>
</template>

<script>
import vRatings from '@/components/common/vRatings'
import { mapGetters } from 'vuex'
export default {
  name: 'GoodDetail',
  components: {
    vRatings,
  },
  props: {
    foodDetail: {
      type: Object,
      default: () => ({}),
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.status,
      ratings: [],
      showBtn: true,
    }
  },
  watch: {
    status(newVal) {
      this.show = newVal
      this.ratings = this.foodDetail.ratings
    },
  },
  computed: {
    ...mapGetters('goods', {
      count: 'count',
    }),

    //从vuex获取food的count
    foodCount() {
      return this.count(this.foodDetail.name)
    },
  },
  methods: {
    //点击返回按钮通知上层组件
    handleClose() {
      this.$emit('statusChange', { status: 'close' })
    },
    handleBtn() {
      this.handleAdd()
    },

    //点击后通知上层组件，将当前food加入购物车
    handleAdd() {
      this.$emit('statusChange', { status: 'add', food: this.foodDetail })
    },
    handleReduce() {
      this.$emit('statusChange', { status: 'reduce', food: this.foodDetail })
    },
  },
}
</script>

<style lang="scss" scoped>
.van-popup {
  background: #f3f5f7;
  padding-bottom: 56px;
  // border-bottom: 1px solid #ccc;
  .detail-header {
    padding: 20px;
    box-shadow: 1px 1px 3px #ccc;
    .food-name {
      margin-bottom: 5px;
      color: #07111b;
      font-weight: bold;
    }
    .food-sell {
      font-size: 12px;
      color: #93999f;
    }
    .detail-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      .food-price {
        color: red;
        font-weight: bold;
      }
      .food-action {
        display: flex;
        text-align: center;
        align-items: center;
        .action-default {
          border: 1px solid #00a0dc;
          padding: 5px;
          border-radius: 15px;
          color: #fff;
          background: #00a0dc;
        }
        .action-move {
          display: flex;
          text-align: center;
          align-items: center;
        }
      }
    }
    .detail-info {
      margin-top: 20px;
      line-height: 24px;
    }
  }

  .detail-ratings {
    margin-top: 18px;
    padding: 20px;
    box-shadow: 1px 1px 3px #ccc;
  }
}
</style>
