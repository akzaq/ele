<template>
  <div class="ratings">
    <div class="ratings-nav">
      <div
        :class="{
          'rating-btn': true,
          'ratings-all': true,
          'rating-btn-focus': btnCurrent === 0,
        }"
        @click="btnClick(0)"
      >
        <slot name="btn1">全部</slot>{{ ratings.length }}
      </div>
      <div
        :class="{
          'rating-btn': true,
          'ratings-good': true,
          'rating-btn-focus': btnCurrent === 1,
        }"
        @click="btnClick(1)"
      >
        <slot name="btn2">满意</slot>{{ getRatingsGood }}
      </div>
      <div
        :class="{
          'rating-btn': true,
          'ratings-bad': true,
          'rating-btn-focus': btnCurrent === 2,
        }"
        @click="btnClick(2)"
      >
        <slot name="btn3">不满意</slot>{{ getRatingsBad }}
      </div>
    </div>
    <div class="ratings-filter" @click="isHidden = !isHidden">
      <van-icon name="checked" :color="isHidden ? '#00c850' : ''" />
      只看有内容的评论
    </div>

    <ul class="rating-ul">
      <li class="rating-li" v-for="(rating, index) in getRatings" :key="index">
        <div class="rating-info">
          <div class="ratingTime">{{ rating.rateTime | getRatingTime }}</div>
          <div class="ratingUser">{{ rating.username }}</div>
        </div>

        <div class="ratingText">
          <div v-if="rating.text">{{ rating.text }}</div>
          <div v-else style="color:#ccc; font-style:italic">
            **该用户没有留下评论**
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatDate } from '@/assets/utils/formatDate'
export default {
  name: 'vRatings',
  props: {
    ratings: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isHidden: false,
      btnCurrent: 0,
    }
  },
  filters: {
    getRatingTime(time) {
      return formatDate(time)
    },
  },
  computed: {
    getRatings() {
      let good = this.ratings.filter((item) => (item.rateType = 1))
      let bad = this.ratings.filter((item) => (item.rateType = 0))
      let firstFilter
      switch (this.btnCurrent) {
        case 1:
          firstFilter = good
          break
        case 2:
          firstFilter = bad
          break
        default:
          firstFilter = this.ratings
      }

      let hasText = firstFilter.filter((item) => item.text != '')
      return this.isHidden ? hasText : firstFilter
    },

    getRatingsGood() {
      let good = this.ratings.filter((item) => (item.rateType = 1))
      return good.length
    },

    getRatingsBad() {
      let bad = this.ratings.filter((item) => (item.rateType = 0))
      return bad.length
    },
  },
  methods: {
    btnClick(index) {
      this.btnCurrent = index
    },
  },
}
</script>

<style lang="scss" scoped>
.ratings {
  width: 100%;
  margin-top: 5px;
  // padding: 20px;
  // box-shadow: 1px 1px 3px #ccc;
  .ratings-nav {
    display: flex;
    justify-content: left;
    .rating-btn {
      background: rgba(0, 160, 220, 0.2);
      height: 30px;
      width: 60px;
      line-height: 30px;
      text-align: center;
      margin-right: 10px;
    }
    .rating-btn-focus {
      background: #00a0dc;
    }
  }

  .ratings-filter {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #93999f;
    padding: 10px 0;
  }
  .rating-ul {
    .rating-li {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding: 10px 0;
      font-size: 12px;
      color: #93999f;
      .rating-info {
        display: flex;
        justify-content: space-between;
      }

      .ratingText {
        padding-top: 5px;
        color: #000;
      }
    }
  }
}
</style>
