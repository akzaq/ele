<template>
  <van-overlay :show="showNotice">
    <div div class="wrapper">
      <div class="wrapper-title">
        {{ seller.name }}
      </div>
      <div class="wrapper-score">
        <img
          class="score-star"
          :src="star"
          v-for="(star, index) in stars"
          :key="index"
        />
      </div>

      <div class="wrapper-info" style="position:fixed;top:130px;">
        <p class="wrapper-line"></p>
        <div class="wrapper-info-title">优惠信息</div>
        <p class="wrapper-line"></p>
      </div>

      <div class="wrapper-cheap">
        <div
          class="wrapper-cheap-info"
          v-for="(item, index) in seller.supports"
          :key="index"
        >
          <img
            class="wrapper-cheap-info-icon"
            :src="require(`@/assets/icon/icon_${item.type}.png`)"
            alt=""
          />{{ item.description }}
        </div>
      </div>

      <div class="wrapper-info" style="position:fixed;top:330px;">
        <p class="wrapper-line"></p>
        <div class="wrapper-info-title">商家公告</div>
        <p class="wrapper-line"></p>
      </div>

      <div class="wrapper-notice">
        <p>{{ seller.bulletin }}</p>
      </div>

      <div class="wrapper-bottom" @click="close">
        <van-icon name="cross" size="26px" />
      </div>
    </div>
  </van-overlay>
</template>

<script>
import getStars from '@/assets/utils/getStars'
export default {
  name: 'HeaderOverlay',
  props: {
    showNotice: {
      type: Boolean,
      default: false,
    },
  },
  inheritAttrs: false,
  data() {
    return {
      seller: this.$attrs['data-seller'],
      stars: [],
    }
  },
  methods: {
    //渲染遮罩层的评分星星
    setStars() {
      this.stars = getStars(this.seller.score)
    },
    //关闭遮罩层，并通知上层组件
    close() {
      this.$emit('change')
    },
  },
  created() {
    this.setStars()
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  z-index: 3000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  .wrapper-title {
    font-size: 16px;
    font-weight: bold;
    position: fixed;
    top: 50px;
  }
  .wrapper-score {
    position: fixed;
    top: 90px;
    .score-star {
      transform: scale(0.5);
    }
  }
  .wrapper-info {
    display: flex;
    .wrapper-line {
      height: 16px;
      width: 150px;
      border-bottom: 1px #ccc solid;
      position: relative;
      top: -5px;
    }
    .wrapper-info-title {
      font-weight: bold;
      margin: 0 5px;
    }
  }

  .wrapper-cheap {
    width: 80vw;
    position: fixed;
    top: 170px;
    .wrapper-cheap-info {
      margin-bottom: 5px;
      flex-wrap: nowrap;
      .wrapper-cheap-info-icon {
        transform: scale(0.7);
        vertical-align: middle;
      }
    }
  }

  .wrapper-notice {
    width: 80vw;
    position: fixed;
    top: 370px;
    font-size: 14px;
    line-height: 24px;
  }

  .wrapper-bottom {
    position: fixed;
    bottom: 20px;
  }
}
</style>
