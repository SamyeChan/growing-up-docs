// 初始化菜单数组
let initArr = (FILE, FOLDER) => {
  let temp = []
  FILE.forEach(item => {
    temp.push(FOLDER + item)
  })
  return temp
}

module.exports = initArr