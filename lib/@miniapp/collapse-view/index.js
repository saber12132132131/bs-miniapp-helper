// components/collapse-view/collapse-view.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["class"],

  properties: {
    line: {
      type: Number,
      value: 1
    },
    showEllipsis: {
      type: Boolean,
      value: true
    },
    showSwitch: {
      type: Boolean,
      value: false
    },
    itemHeight: {
      type: Number,
      value: 0
    },
    showAll: {
      type: Boolean,
      value: false
    },
    delay: {
      type: Boolean,
      value: false
    },
    useOpenCloseSlot: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    "showAll": function (newVal) {
      this.setData({
        isCollapse: !this.data.showAll
      })
    },
  },
  lifetimes: {
    ready() {
      this.data.delay ?
        this.timer = setTimeout(() => {
          this.loadText()
        }, 2000) : this.loadText()
    },
    moved() {
      this.data.delay ?
        this.timer = setTimeout(() => {
          this.loadText()
        }, 2000) : this.loadText()
    },
    detached() {
      if (this.timer) {
        clearTimeout(this.timer)
      }

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lineStyle: "",
    isCollapse: true,
    showSwitch: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadText() {
      const query = this.createSelectorQuery()
      query.select('.warp-item').boundingClientRect()
      query.select('.inline-block').boundingClientRect()
      query.exec((res) => {
        try {
          console.log(res)
          let [{ height }, { height: singleHeight }] = res
          singleHeight = this.data.itemHeight > 0 ? this.data.itemHeight : singleHeight

          if (height && singleHeight && height > this.data.line * singleHeight) {
            this.setData({
              lineStyle: `
              display:-webkit-box;
              -webkit-line-clamp: ${this.data.line};
              -webkit-box-orient: vertical;
              visibility: visible;
            `,
              inlineBlockStyle: `display:none`,
              isCollapse: true,
            })
            // 说明超过限制行数
            this.triggerEvent("overflow")
            this.setData({
              showSwitch: true
            })
          } else {
            this.setData({
              lineStyle: `
              display:block;
              -webkit-line-clamp: ${this.data.line};
              -webkit-box-orient: vertical;
              visibility: visible;
            `,
              inlineBlockStyle: `display:none`,
              isCollapse: true,
            })
            this.setData({
              showSwitch: false
            })
          }
        } catch (error) {

        }

      })
    },
    taggle() {
      this.setData({
        isCollapse: !this.data.isCollapse
      })
      console.log(this.data.isCollapse)
      if (this.data.isCollapse) {
        console.log('line', this.data.line)
        this.setData({
          lineStyle: `
            display: -webkit-box;
            -webkit-line-clamp: ${this.data.line};
            -webkit-box-orient: vertical;
            visibility: visible;
          `,
        })
      } else {
        console.log('line', '10000')
        this.setData({
          lineStyle: `
             display: -webkit-box;
            -webkit-line-clamp: 10000;
            -webkit-box-orient: vertical;
            visibility: visible;
          `,
        })
      }
    },
    handleClick(e) {
      const { close } = e.detail
      this.setData({
        isCollapse: close
      })
    }
  }
})
