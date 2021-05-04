//传入一个Number,返回一个装载星星图片地址的数组
function getStars(score) {
  //获取评分的整数部分和小数部分
  const scoreInt = Math.floor(score)
  const scoreFloat = score - scoreInt

  //新建长度为scoreInt的数组并填充相应数量的星星
  let StarsArr = new Array(scoreInt).fill(require('@/assets/star/star_on.png'))
  scoreFloat >= 0.5
    ? StarsArr.push(require('@/assets/star/star_half.png')) //半颗星
    : StarsArr.push(require('@/assets/star/star_off.png')) //灰色星星

  return StarsArr
}

export default getStars
