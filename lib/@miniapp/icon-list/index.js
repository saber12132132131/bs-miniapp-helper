

// components/icon-list/icon-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconList: {
      type: Array,
      value: [],
    },
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
    goOther(e) {
      const item = e.currentTarget.dataset.item;
      this.triggerEvent("click", {
        item
      })
    },
  }
})
