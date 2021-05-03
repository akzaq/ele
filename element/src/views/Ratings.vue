<template>
  <div class="page-ratings" ref="wrapper">
    <div class="content">
      <div class="rating-store">
        <div class="store-left">
          <div class="store-score">
            <p class="store-score-show">{{ seller.score }}</p>
            <p class="store-score-title">综合评分</p>
            <p class="store-score-des">高于周边商家{{ seller.rankRate }}%</p>
          </div>
        </div>
        <div class="store-right">
          <div class="store-service">
            <p>服务态度</p>
            <div class="score-stars">
              <img
                v-for="(star, index) in serviceStars"
                :key="index"
                :src="star"
                style="width:15px;height: 15px;"
              />
            </div>
            <p class="score-show">{{ seller.serviceScore }}</p>
          </div>
          <div class="food-score">
            <p>商品评分</p>
            <div class="score-stars">
              <img
                v-for="(star, index) in foodStars"
                :key="index"
                :src="star"
                style="width:15px;height: 15px;"
              />
            </div>
            <p class="score-show">{{ seller.foodScore }}</p>
          </div>
          <div class="delivery-time">
            <span>送达时间</span>
            <p class="deliveryTime-show">{{ seller.deliveryTime }}分钟</p>
          </div>
        </div>
      </div>

      <div class="ratings">
        <v-ratings :ratings="ratings" />
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import getStars from '@/utils/getStars'
import vRatings from '@/components/common/vRatings'
export default {
  name: 'Ratings',
  data() {
    return {
      scoreStars: [],
      foodStars: [],
      serviceStars: [],
    }
  },
  components: {
    vRatings,
  },
  computed: {
    ...mapState('seller', {
      seller: (state) => state.seller,
    }),
    ...mapState('ratings', {
      ratings: (state) => state.ratings,
    }),
  },
  methods: {
    setStars() {
      this.scoreStars = getStars(this.seller.score)
      this.foodStars = getStars(this.seller.foodScore)
      this.serviceStars = getStars(this.seller.serviceScore)
    },

    //初始化better-scroll
    initScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          // scrollbar: true, //滚动条样式
          // pullDownRefresh: true, //配置顶部下拉的距离来决定刷新时机
          observeDOM: true, //开启对 content 以及 content 子元素 DOM 改变的探测。
          click: true, //开启点击事件
          probeType: 3, //监测实时滚动
        })
      })
    },
  },
  created() {
    this.initScroll()
    this.setStars()
  },
}
</script>

<style lang="scss" scoped>
.page-ratings {
  overflow: hidden;
  // height: 100%;
  // width: 100%;
  background: #f3f5f7;

  .content {
    .rating-store {
      background: #fff;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding: 30px 0;
      margin-bottom: 20px;
      display: flex;
      .store-left {
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        align-self: center;
        padding: 0 5px;
        flex: 1;
        .store-score-show {
          color: #f90;
          font-size: 24px;
          font-weight: bold;
          padding-bottom: 5px;
        }
        .store-score-title {
          color: #000;
          font-size: 12px;
          padding-bottom: 3px;
        }
        .store-score-des {
          font-size: 10px;
          color: #93999f;
        }
      }

      .store-right {
        flex: 2;
        padding-left: 30px;
        font-size: 12px;
        color: #000;
        .store-service,
        .food-score {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .score-stars {
            margin: 0 14px;
          }
          .score-show {
            color: #f90;
          }
        }

        .delivery-time {
          .deliveryTime-show {
            margin-left: 14px;
            display: inline-block;
            color: #93999f;
          }
        }
      }
    }

    .ratings {
      background: #fff;
      padding: 10px;
    }
  }
}
</style>
