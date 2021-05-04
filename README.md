# 实现功能：

```
•	Goods、Ratings、Seller组件视图均可上下滚动
•	商品页 点击左侧menu，右侧list对应跳转到相应位置
•	点击list查看商品详情页，父子组件的通信
•	评论内容够可以筛选查看
•	购物车组件，包括添加删除商品及动效，选择使用vuex储存添加到购物车的商品的数组，点击购物车图标，展示选择的商品列表
•	商家实景图片可以左右滑动

```

# 项目结构分析：

    assets/---- 文件夹存放的是通用的js,css和icon
    components/----文件夹用来存放我们的 Vue 组件
    store/----文件夹用来存放vuex的相关配置
    views/----文件件用来存放页面级路由文件
    App.vue----根组件，所有的子组件都将在这里被引用
    main.js----入口文件的 js 逻辑，在 webpack 打包之后将被注入到 index.html 中
    router.js----路由的相关配置文件

# 各组件之间的关系：

```
├──APP.vue
  │  ├──Header.vue--头部组件
  │  │  ├──HeaderOverlay.vue--遮罩层部分，内涵商家信息
  │  ├──goods.vue--商品组件
  │  │  ├──GoodShopping.vue--购物车组件
  │  │  ├──GoodDetail.vue--详情页组件
  │  │  ├──food.vue--商品详情页
  │  │  │  ├──vRatings.vue--评价内容筛选组件
  │  ├──ratings.vue--评论组件
  │  │  ├──vRatings.vue--评价内容筛选组件
  │  ├──seller.vue--商家组件

独立组件
  ├──vRatings.vue--评价内容筛选组件
```

# 开发过程问题和技巧汇总：

## 1、设置 css 样式：

对全局使用 normalize.css(https://necolas.github.io/normalize.css/)初始化
公共 base.css--做一些个人习惯 css 预设，添加伪类清除浮动等 class
该项目基本采用 flex 弹性布局

## 2、要求宽度自适应的布局，

采用 flex 布局,父级 display:fixed,子元素 flex:放大倍数，缩小倍数，基准值

## 3、transition 过渡

在点击添加商品中使用 transition 过渡效果，实现添加减少按钮的动效

## 4、better-scroll 插件：

### 问题一：BS 对象初始化失败

问题分析：开发过程的基本逻辑是获取数据->DOM 渲染-> BS 对象初始化 。better-scroll 插件是严格基于 DOM 的，也就是说必须保证 DOM 已经渲染完毕后才，页面打开时 DOM 并没有渲染完成，BS 对象找不到挂载的 DOM，控制台报错。
打印 BS 对象查找 hasVerticalScroll 会发现为 false
解决方案：在生命周期钩子中，同时搭配$nextTick()

```
created(){
  $nextTick(()=>{
    new BScroll()
  })
}

```

### 问题二：对于使用使用了 v-show="show" 的组件，BS 初始化失败

问题分析：v-show 是基于控制 css 的 display：none 实现的。这种情况必须监听 show
解决方案：监听 show，动态初始化 BS 对象

```
watch:{
  show(newVal){
    newVal ? new BScroll():''
  }
}
```

### 问题三：在 seller 页面，商家实景使用了 better-scroll 但是无法横向滚动

问题分析：横向滚动需要保证滚动元素为内联块，且不能换行

```
//css
display: inline-block;
white-space: nowrap;

//js
new BScroll(this.$wrapper,{
  scrollX: true
})
```

# 5、goods,ratings,seller 组件之间切换时会重新渲染

解决方案：在 app.vue 内使用`keep-alive`，保留各组件状态，避免重新渲染

```

<keep-alive>
    <router-view ></router-view>
</keep-alive>
```

## 6、better-scroll 的设置

better-scroll 配置依赖于文档，与 created 中初始化。值得注意的是，初始化必须等待 DOM 渲染完毕。

# 总结

    将相同样式或功能的区块单独提出来，作为一个组件。

另外组件中用到的图片，css ，js 等资源放置 assets 目录下

抽离组件遵循原则：
_要尽量遵循单一职责原则，复用性更高，不要设置额外的 margin 等影响布局的东西_

## -scss

全局安装，安装之前你需要你安装 nodejs

## 项目运行

```
克隆项目到本地
git clone git@github.com:akzaq/ele.git

安装依赖  采用前后端分离模式，进行开发。打开两个终端分别键入 cd element 和 cd server

npm install

/element npm run dev
/server nodemon app

构建生产
/element npm run build

```
