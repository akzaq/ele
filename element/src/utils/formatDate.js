// let time = 1617235200 * 1000
export function formatDate(time) {
  var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
  return date
    .toJSON()
    .substr(0, 19)
    .replace('T', ' ')
}

// 2021-04-01 08:00:00
