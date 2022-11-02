// components/bottom-bar/botttom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['custom-item'],
  properties: {
    iconList: {
      type: Array,
      value: []
    },
    rightSlot: {
      type: Boolean,
      value: true
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
    handleTap(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent("click", {
        value: index
      })
    }
  }
})
