# Note | 压缩文件

1. 以图片压缩为例：（ES5 callback 写法）

```javascript
function compressImg(base64, fileType, callback) {

  //压缩比例
  var SIZE = base64.length;
  var M_Byte = 1024*1024;
  var COMPRESS_RATE = 1;
  if (SIZE > (5*M_Byte) ) {
    COMPRESS_RATE = (3*M_Byte) / SIZE
  } else if (M_Byte < SIZE < (5*M_Byte) ){
    COMPRESS_RATE = 0.5
  } else {
    COMPRESS_RATE = 1
  }

  // 创建一个img对象为了获取图片的宽和高
  var img = new Image();
  img.src = base64;
  img.onload = function () {
    var imgWidth = img.width;
    var imgHeight = img.height;

    // 创建canvas画布
    var canvas = document.createElement('canvas');
    var cxt = canvas.getContext('2d');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    cxt.fillRect(0, 0 , imgWidth, imgHeight);
    cxt.drawImage(img, 0, 0 , imgWidth, imgHeight);
    // 压缩后的图片
    var compressBase64 = canvas.toDataURL(fileType, COMPRESS_RATE);
    // 通过以回调函数的形式返回新生成的图片
    if (callback) {
      callback(compressBase64)
    }
  }
}
```
调用方法：
```javascript
processImg (base64, 'image/jpeg', function (newBase64) {
  ... // 省略
})

```

2. 以图片压缩为例：（ES6 Promise 写法）

```javascript
const compressImg = (base64, fileType) => {
  return new Promise((resolve, reject) => {
    //压缩比例
    const SIZE = base64.length;
    const M_Byte = 1024*1024;
    let COMPRESS_RATE = 1;
    if (SIZE > (5*M_Byte) ) {
      COMPRESS_RATE = (3*M_Byte) / SIZE
    } else if (M_Byte < SIZE < (5*M_Byte) ){
      COMPRESS_RATE = 0.5
    } else {
      COMPRESS_RATE = 1
    }

    // 创建一个img对象为了获取图片的宽和高
    const img = new Image();
    img.src = base64;
    // 加载中
    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;

      // 创建canvas画布
      const canvas = document.createElement('canvas');
      const cxt = canvas.getContext('2d');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      cxt.fillRect(0, 0 , imgWidth, imgHeight);
      cxt.drawImage(img, 0, 0 , imgWidth, imgHeight);
      // 压缩后的图片
      const compressBase64 = canvas.toDataURL(fileType, COMPRESS_RATE);
      resolve(compressBase64);
    }
    // 加载失败
    img.onerror = () => {
      reject('compressImg  img err: 图片加载失败!');
    }
  })

}
```
调用方法：
```javascript
compressImg(base64, imgType).then(compressBase64 => {
  ...... // 省略
})
.catch(err => {
  console.log("compressImg err:" + err);
});
```