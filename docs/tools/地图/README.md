# Api | 地图

## 3大主流地图

[高德地图](https://lbs.amap.com/api/wx/summary/)
[腾讯地图](https://lbs.qq.com/qqmap_wx_jssdk/index.html)
[百度地图](http://lbsyun.baidu.com/index.php?title=wxjsapi)

## 腾讯地图API

哎呀，部门停车项目需要做到停车区域的标定，自然就要有地图啊、地图上的标定啥啥啥的啦，然后项目实际是微信服务号的开发，所以首选了腾讯地图的 API 咯～

### 01 注册账号 & 申请key

根据以下链接，进行开发者账号、密钥的申请：

[在官网注册 > 申请 key](https://lbs.qq.com/guides/startup.html)

拿到最重要的 key：

![开发密钥（Key）](./imgs/api-map-tecent.png)

### 02 引入

在 `index.html` 头部引入：

```html
<script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=这里是之前申请的那个key啊"></script>
```

### 03 地图 Hello World!

```vue
<template>
  <!-- 01 需要一个地图的容器 -->
  <div
    class="map_field"
    :style="`{width:${VIEWPORT.WIDTH}px;height:${VIEWPORT.HEIGHT - 45}px;`">
  </div>
</template>

<script>
import { VIEWPORT } from '@/consts'

export default {
  name: 'MapField', // 地图模式
  data () {
    return {
      VIEWPORT
    }
  },
  methods: {
    /* -- 02 需要初始化地图 -- */
    init () {
      // 设置中心点
      var targetLatLng = new qq.maps.LatLng(22.2549100000, 113.5899600000)
      // 定义map变量 调用 qq.maps.Map() 构造函数获取地图显示容器
      var map = new qq.maps.Map(document.querySelector(".map_field"), {
        center: targetLatLng, // 地图的中心地理坐标
        zoom: 18, // 缩放级别[1,18]
        mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
```
![初始地图](./imgs/api-map-tecent-init.png)

### 04 添加地图标定

```js
/* -- 03 对地图上某个特定点进行标记 -- */
// 图标标记
var marker = new qq.maps.Marker({
  position: targetLatLng,
  map: map
})
// 文本标记
var marker = new qq.maps.Label({
  position: targetLatLng,
  map: map,
  content:  `<h3>碎碎碎碎停车场</h3>
            <div>
              总：111，<span class="sign_red">余：66</span>
            </div>`
})
```
![标记地图](./imgs/api-map-tecent-sign.png)

### 05 添加多个标记

```js
// 00 - 需要又一个存储了多个经纬等信息的数组哟
init () {
  // 定义map变量 调用 qq.maps.Map() 构造函数获取地图显示容器
  var map = new qq.maps.Map(document.querySelector(".map_field"), {
    center: new qq.maps.LatLng(this.latLngArr[0].latitude, this.latLngArr[0].longitude), // 地图的中心地理坐标
    zoom: 11, // 缩放级别[1,18]
    mapTypeId: qq.maps.MapTypeId.ROADMAP // 设置地图样式
  })
  this.latLngArr.forEach(item => {
    // 图标标记
    let marker = new qq.maps.Marker({
      position: new qq.maps.LatLng(item.latitude, item.longitude),
      map: map
    })
    // 文本标记
    let markerLable = new qq.maps.Label({
      position: new qq.maps.LatLng(item.latitude, item.longitude),
      map: map,
      content:  `<h3>${item.name}</h3>
                <div>
                  总：${item.total}，<span class="sign_red">余：${item.lave}</span>
                </div>`
    })
  })
}
```
![多个标记](./imgs/api-map-tecent-multi-sign.png)

### 06 自定义图标

```js
// 01 设置图标
iconConfig () {
  let anchor = new qq.maps.Point(0, 39), // 锚点位？
  size = new qq.maps.Size(36, 36), // 图标大小
  origin = new qq.maps.Point(0, 0), // 图标定位？
  icon = new qq.maps.MarkerImage( // 图标配置
      "/static/sign-colorful.png",
      size,
      origin,
      anchor
  )
  return icon
}

// 02 应用于标记中
marker.setIcon(this.iconConfig())
```
![自定义标记](./imgs/api-map-tecent-selfset-icon.png)

### 07 标记点击事件