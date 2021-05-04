<template>
  <div id="app">
    <Header v-if="seller" :data-seller="seller" />

    <div class="tab">
      <router-link to="/goods" tag="div">商品</router-link>
      <router-link to="/ratings" tag="div">评论</router-link>
      <router-link to="seller" tag="div">商家</router-link>
    </div>
    <keep-alive>
      <router-view class="router-view" />
    </keep-alive>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { SELLER_SET } from '@/store/seller/sellerMutationsType'
import { RATINGS_SET } from '@/store/ratings/ratingsMutationsType'
import Header from '@/components/Header'
export default {
  name: 'App',
  computed: {},
  components: {
    Header,
  },
  computed: {
    ...mapState('seller', {
      seller: (state) => state.seller,
    }),

    getRouterHeight() {},
  },
  methods: {
    ...mapMutations('seller', {
      SELLER_SET,
    }),
    ...mapMutations('ratings', {
      RATINGS_SET,
    }),

    async saveSeller() {
      let sellerRes = await this.$http('seller')
      this.SELLER_SET(sellerRes.data)
    },

    async saveRatings() {
      let ratingsRes = await this.$http('ratings')
      this.RATINGS_SET(ratingsRes.data)
    },
  },
  created() {
    this.saveSeller()
    this.saveRatings()
  },
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/base.css';
#app {
  height: 100vh;
  overflow: hidden;
  .tab {
    background: #fff;
    box-shadow: 1px 1px 3px #ccc;
    display: flex;
    justify-content: space-around;
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    .router-link-active {
      color: red;
      border-bottom: 2px red solid;
    }
  }
  .router-view {
    // height: calc(100vh - 200px);
    height: 536px;
  }
}
</style>
