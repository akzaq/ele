<template>
  <div class="page-seller">
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <div class="store">
          <div class="title">
            <div class="title-left">
              <p class="title-show">{{ seller.name }}</p>
              <div class="des">
                <div class="stars">
                  <img
                    v-for="(star, index) in stars"
                    :key="index"
                    :src="star"
                    style="width:15px;height: 15px;"
                  />
                </div>
                <p class="sell">月售{{ seller.sellCount }}单</p>
              </div>
            </div>
            <div class="title-right" @click="isCollection = !isCollection">
              <van-icon
                class="collection-icon"
                name="like"
                size="24px"
                :color="isCollection ? 'red' : 'gray'"
              />
              <p class="collection-text">{{ hasCollection }}</p>
            </div>
          </div>

          <ul class="store-msg">
            <li class="store-msg-li">
              <p class="li-des">起送价</p>
              <div>
                <span class="li-msg">{{ seller.minPrice }}</span>
                元
              </div>
            </li>
            <li class="store-msg-li">
              <p class="li-des">商家配送</p>
              <div>
                <span class="li-msg">{{ seller.deliveryPrice }}</span
                >元
              </div>
            </li>
            <li class="store-msg-li">
              <p class="li-des">平均配送时间</p>
              <div>
                <span class="li-msg">{{ seller.deliveryTime }}</span
                >分钟
              </div>
            </li>
          </ul>
        </div>

        <div class="activity">
          <div class="activity-title">公告与活动</div>
          <div class="activity-text">{{ seller.bulletin }}</div>
          <ul class="activity-ul">
            <li
              class="activity-li"
              v-for="(support, index) in seller.supports"
              :key="index"
            >
              <img
                :src="require(`@/assets/icon/icon_${support.type}.png`)"
                style="width:16px;height:16px;margin-right:5px;"
              />
              {{ support.description }}
            </li>
          </ul>
        </div>

        <div class="picture">
          <p class="picture-title">商家实景</p>
          <div ref="ulWrapper" style="overflow:hidden;">
            <ul class="picture-ul">
              <li
                class="picture-li"
                v-for="(pic, index) in seller.pics"
                :key="index"
              >
                <img :src="pic" alt="" style="width: 120px;height: 90px;" />
              </li>
            </ul>
          </div>
        </div>

        <div class="info">
          <p class="info-title">商家信息</p>
          <ul class="info-ul">
            <li
              class="info-li"
              v-for="(info, index) in seller.infos"
              :key="index"
            >
              {{ info }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import getStars from '@/assets/utils/getStars'
export default {
  name: 'Seller',
  data() {
    return {
      stars: [],
      isCollection: false,
    }
  },
  computed: {
    ...mapState('seller', {
      seller: (state) => state.seller,
    }),

    //判断是否收藏
    hasCollection() {
      return this.isCollection ? '已收藏' : '收藏'
    },
  },
  methods: {
    //初始化better-scroll
    initScroll() {
      this.$nextTick(() => {
        new BScroll(this.$refs.wrapper, {
          click: true,
          observeDOM: true,
        })

        new BScroll(this.$refs.ulWrapper, {
          scrollX: true,
          click: true,
        })
      })
    },
  },
  created() {
    this.initScroll()
    this.stars = getStars(this.seller.score)
  },
}
</script>

<style lang="scss" scoped>
.page-seller {
  .wrapper {
    height: 100%;
    overflow: hidden;
  }
  .content {
    background: #f3f5f7;
    font-size: 14px;
    color: #07111b;
    .store {
      padding: 18px;
      background: #fff;
      box-shadow: 1px 1px 3px #ccc;
      margin-bottom: 18px;
      .title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        color: #07111b;
        .title-left {
          .des {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #4d555d;
            padding: 10px 0;
            .stars {
              padding-right: 20px;
            }
          }
        }

        .title-right {
          color: #4d555d;
          font-size: 12px;
          text-align: center;
          .collection-text {
            width: 40px;
          }
        }
      }

      .store-msg {
        display: flex;
        justify-content: space-between;
        padding-top: 18px;
        .store-msg-li {
          flex: 1;
          text-align: center;
          font-size: 10px;
          color: #07111b;
          &:nth-child(2) {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }
          .li-des {
            color: #93999f;
          }
          .li-msg {
            font-size: 24px;
          }
        }
      }
    }

    .activity {
      background: #fff;
      margin-bottom: 18px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-shadow: 1px 1px 3px #ccc;
      padding: 18px 18px 0;
      font-size: 12px;
      .activity-title {
        font-size: 14px;
      }
      .activity-text {
        color: red;
        padding: 16px 12px;
        line-height: 24px;
      }
      .activity-ul {
        .activity-li {
          padding: 16px 12px;
          margin-top: 1px solid #ccc;
          display: flex;
          align-items: center;
        }
      }
    }

    .picture {
      background: #fff;
      margin-bottom: 18px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-shadow: 1px 1px 3px #ccc;
      padding: 18px;
      .picture-title {
        margin-bottom: 12px;
      }

      .picture-ul {
        //横向滚动滚动元素必须设置为inline-block,并且不能换行
        display: inline-block;
        white-space: nowrap;
        .picture-li {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
    .info {
      background: #fff;
      border-top: 1px solid #ccc;
      box-shadow: 1px 1px 3px #ccc;
      padding: 18px 18px 0;
      .info-title {
        margin-bottom: 12px;
      }
      .info-ul {
        .info-li {
          font-size: 12px;
          border-top: 1px solid #ccc;
          padding: 16px 12px;
        }
      }
    }
  }
}
</style>
