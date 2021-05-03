const express = require('express')
const cors = require('cors')
const data = require('./data.json')

const app = express()

// //设置允许来自localhost:8080的请求
// const corsOptions = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200,
// }

// app.use(cors(corsOptions))

app.use(cors())

app.use(express.json())

//获取商品数据
app.get('/api/goods', (req, res) => {
  res.send(data.goods)
})

//获取商家数据
app.get('/api/seller', (req, res) => {
  res.send(data.seller)
})

//获取评论数据
app.get('/api/ratings', (req, res) => {
  res.send(data.ratings)
})

app.listen(3000)
