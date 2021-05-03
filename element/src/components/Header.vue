<template>
  <div class="header">
    <!-- 顶部导航栏 -->
    <div class="top">
      <van-nav-bar
        title=""
        left-text="返回"
        :fixed="true"
        :placeholder="true"
        left-arrow
        @click-left="handleLeft"
        @click-right="showShare = !showShare"
      >
        <template #right>
          <van-icon name="ellipsis" size="18" />
        </template>
      </van-nav-bar>
    </div>

    <!-- 分享面板 -->
    <div class="store-share">
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>

    <!-- 头部信息 -->
    <div class="header-nav">
      <!-- 背景模糊处理 -->
      <div
        class="header-background"
        :style="`background: #ccc url(${seller.avatar}) no-repeat center; `"
      ></div>

      <div class="store-info">
        <div class="avatar">
          <img
            class="avatar-img"
            :src="seller.avatar"
            style="width: 64px; height: 64px;"
          />
        </div>

        <div class="store-content">
          <div class="store-title">
            <img
              class="store-title-icon"
              :src="require(`@/assets/icon/brand.png`)"
              style="width:30px;height:18px;"
            />
            <p class="store-name">
              {{ seller.name }}
            </p>
          </div>

          <div class="store-description">
            {{ seller.description }}
          </div>

          <div class="store-supports">
            <img
              class="store-supports-icon"
              :src="require(`@/assets/icon/icon_${supportsText.type}.png`)"
              style="width:16px;height:16px;"
            />
            <p class="store-supports-des">
              {{ supportsText.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 公告栏内容 -->
      <div
        class="store-notice"
        style="background: rgba(7, 17, 27, 0.4);"
        @click="showNotice = !showNotice"
      >
        <img
          class="store-notice-icon"
          :src="require('@/assets/icon/notice.png')"
        />
        <div class="store-notice-text">
          {{ seller.bulletin }}
        </div>
        <van-icon name="arrow" />
      </div>

      <!-- 遮罩层内容 -->
      <header-overlay
        v-bind="$attrs"
        :showNotice="showNotice"
        @change="showNotice = false"
        style="z-index:3000"
      />
    </div>
  </div>
</template>
<script>
import HeaderOverlay from '@/components/HeaderOverlay'
export default {
  name: 'Header',
  components: {
    HeaderOverlay,
  },
  inheritAttrs: false,
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      showNotice: false,
      seller: this.$attrs['data-seller'],
    }
  },
  computed: {
    //每次刷新返回不同的description
    supportsText() {
      return this.seller.supports[Math.floor(Math.random() * 5)]
    },
  },
  methods: {
    handleLeft() {
      alert('测试功能')
    },
  },
}
</script>

<style lang="scss" scoped>
.header-nav {
  color: #fff;
  position: relative;
  .header-background {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(5px);
  }

  .store-info {
    background: rgba(7, 17, 27, 0.2);
    display: flex;
    padding: 15px 0;
    .avatar {
      margin: 0 10px 0 30px;
      .avatar-img {
        display: block;
      }
    }
    .store-content {
      flex: 1;
      .store-title {
        position: relative;
        margin-bottom: 5px;
        .store-title-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .store-name {
          margin-left: 36px;
          font-weight: bold;
          font-size: 18px;
          line-height: 18px;
        }
      }

      .store-description {
        margin-bottom: 5px;
      }
      .store-supports {
        position: relative;
        .store-supports-icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        .store-supports-des {
          margin-left: 18px;
          font-weight: bold;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }

  .store-notice {
    position: relative;
    height: 28px;
    .store-notice-icon {
      margin-left: 5px;
      width: 26px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .store-notice-text {
      margin: 0 18px 0 38px;
      line-height: 28px;
      // 文本溢出省略
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }
}
</style>
