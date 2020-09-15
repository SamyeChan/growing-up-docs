/**
 * 生成制定文件夹下的路径 --> 用在【sidebar】中
 * 
 * @param folder 父文件夹
 * @param files 文件名称
 */
const initList = (folder, files) => {
  const arr = []
  files.forEach(item => {
    if (item === '') {
      arr.push(folder)
    } else {
      arr.push(folder + item)
    }
  })
  console.log(arr)
  return arr
}

module.exports = { initList }
