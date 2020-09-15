# Note | 二维码

**1. 生成二维码的插件vue-qr**

这个插件可支持生成带有中间图标的二维码

```bash
npm install --save vue-qr
```

例子：
```html
html:
  <template>
    <div class="qrcode">
      <vue-qr id="qrcode"
        :logoScale="config.logoScale"
        :logoSrc="config.imagePath"
        :text="config.value"
        :size="config.size"
        :margin="0"
        :logoMargin="config.logoMargin"
      >
      </vue-qr>
    </div>
  </template>
  <script>
    import VueQr from 'vue-qr'
    export default {
      components: {
        VueQr
      },
      data() {
        return {
          config: {
            value: url, // 二维码对应的路径
            imagePath: require('Picture relative path'), // 二维码中间插入的图片
            logoScale: 0.3, // 中间图片占二维码的比例
            logoMargin: 5, // 图片外边距
            size: 200, // 生成二维码大小 200*200
          }
        }
      }
    }
  </script>
```
**2. 利用canvas加入文字**

接上面的例子：
```html
  <template>
    <div class="qrcode">
      <!-- 省略上面代码 -->
      <img :src="imgSrc" style="width: 220px; height: 260px;"/>
    </div>
  </template>
  <script>
    export default {
      // 省略上面代码
      methods: {
        processQrcode(text) {
          const MARGIN = 10;
          const SIZE = this.config.size;
          const cvsWidth = this.config.size + 2*MARGIN;
          const cvsHeight = this.config.size + 6*MARGIN;
          let canvas = document.createElement('canvas');
          let cxt = canvas.getContext('2d');
          let img = document.querySelector('#qrcode img');
          canvas.width = cvsWidth; // 二维码大小为200*200，故canvas画布不能小于二维码
          canvas.height = cvsHeight;
          cxt.fillRect(0, 0, cvsWidth, cvsWidth); // 创建填充区域（只有矩形一种填充区域）
          // 图片加载完成
          img.onload = () => {
            const textTop = (cvsHeight - SIZE - MARGIN) / 2; // 字体位置纵坐标
            const textLeft = cvsWidth / 2; // 字体位置横坐标
            cxt.drawImage(img, 10, 10, SIZE, SIZE); // 将二维码放入填充区域，坐标（10,10）
            cxt.fillText(text, textLeft, textTop); // 添加文字到目标位置
            cxt.save(); // 保存上下文环境

            // 下面是调整样式

            cxt.fillStyle = '#fff'; // 填充区域背景为白色（效果为二维码周围背景为白色，否则为透明）
            cxt.font = 'bold 18px Georgia'; // 设置字体
            cxt.textBaseline = 'middle'; // 使字体在该坐标的水平线居中位置
            cxt.textAlign = 'center'; // 字体水平居中
            // cxt.measureText(text).width // 文字所占据的宽度
            this.imgSrc = canvas.toDataURL('image/jpeg', 1); // toDataURL有两个参数，第一个指定生成的图片类型，第二个设置图片的质量（可用于图片压缩）
          }
        }
      },
      mounted() {
        this.processQrcode('hello world');
      }
    }
  </script>
```

**3. 总结**
* vue-qr生成二维码
* 创建canvas画布
* 创建填充区域fillRect
* 获取二维码图片img，放入填充区域drawImage
* 计算添加字体的坐标，添加到填充区域fillText
* 调整填充区域样式
* 重新生成图片base64格式 toDataURL