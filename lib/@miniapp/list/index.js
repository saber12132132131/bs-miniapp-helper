// components/list/index.js
Component({
  options:{
    multipleSlots:true
  },
  externalClasses: ["custom-top"],
  /**
   * 组件的属性列表
   */
  properties: {
    swipe:{
      type:Boolean,
      value:false
    }
  },

  lifetimes:{
     attached(){
           this.getContainerHeight()
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
     //获取容器高度 
     getContainerHeight(){
      const query = this.createSelectorQuery().in(this)
      query.selectViewport().scrollOffset()
      query.select(".top").boundingClientRect()
      query.exec(res=>{
        const [{ scrollHeight: screenHeight }, { height: topHeight }] = res;
        this.setData({
          containerHeight: screenHeight - topHeight,
        });
      })
     }
  }
})