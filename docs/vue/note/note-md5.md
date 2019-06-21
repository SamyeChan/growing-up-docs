# Note | MD5加密文件

1. 将文件进行MD5加密，可以生成唯一对应的密钥
```javascript
  import SparkMD5 from 'spark-md5'

  const computedMD5 = (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      let md5 = ''
      // 将文件对象放入二进制缓存区arrayBuffer
      fileReader.readAsArrayBuffer(file)
      // 读取中
      fileReader.onload = (e) => {
        // md5加密
        md5 = SparkMD5.ArrayBuffer.hash(e.target.result)

        // 返回加密结果
        resolve({code: 200, content: md5, mes: '加密成功！'})
      }
      // 读取失败
      fileReader.onerror = () => {
        reject({code: 400, content: '', mes: '文件读取失败！'})
      }
    })
  }
```
2. 应用
```javascript
  // file即为上传的文件对象
  computedMD5(file).then(res => {
    // res.content即为加密结果
  }).catch(err => {
    console.log(err.mes)
  })
```
3. sparkmd5知识扩展--分片进行md5加密
```javascript
// 实现了大文件分片进行加密
export const computeMD5 = (f) => {
  return new Promise((resolve, reject) => {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice // file slice兼容性
    let chunkSize = 2 * 1024 * 1024 // 每一个分片2M
    let file = f.file // 文件对象file
    let chunks = Math.ceil(file.size / chunkSize) // 总共分了多少片
    let currentChunk = 0 // 当前分片
    let spark = new SparkMD5.ArrayBuffer() // 只有这样写才能用spark.append和spark.end方法
    let fileReader = new FileReader() // 文件读取对象
    // 分割第一片进行读取
    const firstEnd = (chunkSize <= file.size) ? chunkSize : file.size
    const firstFile = blobSlice.call(file, 0, firstEnd)
    fileReader.readAsArrayBuffer(firstFile)
    // 读取中
    fileReader.onload = (e) => {
      // 向spark添加每个分片
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        const start = currentChunk * chunkSize
        // 最后一个分片，end为file.size
        const end = ((start + chunkSize) >= file.size) ? file.size : chunkSize
        // 会产生递归，直到全部分片添加完成
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      } else {
        // 加密成功，生成hash
        const hexHash = spark.end()
        resolve({ code: 200, content: hexHash, mes: '加密成功！' })
      }
    }
    // 读取失败
    fileReader.onerror = () => {
      reject(new Error({ code: 500, content: '', mes: '文件读取失败！' }))
    }
  })
}
```