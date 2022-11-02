// components/open-map/open-map.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["class"],
  properties: {
    latitude: {
      type: Number,
      value: 39.909401,
    },
    longitude: {
      type: Number,
      value: 116.433589,
    },
    des: {
      type: String,
      value: "北京"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    openMapApp() {
      this.mapCtx = wx.createMapContext("myMap", this)
      this.mapCtx.openMapApp({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        destination: this.data.des,
        success: (res) => {
          console.log(res)
        },
        fail: res => {
          console.log(res)
        }
      })
    }
  }
})
