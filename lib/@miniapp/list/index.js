// components/list/index.js
Component({
  options:{
    multipleSlots:true
  },
  externalClasses: ["custom-top","custom-container"],
  /**
   * 组件的属性列表
   */
  properties: {
    swipe:{
      type:Boolean,
      value:false
    },
    description:{
      type:String,
      value:""
    },
    params:{
      type:Object,
      value:null
    },
    apiFn:{
      type:Function,
      value:async (data)=>{ 
        console.log("default funtion")
      
      }
    },
    apiConfig:{
      type:Object,
      value:{}
    },
    startPage:{
      type:Number,
      value:1
    },
    size:{
      type:Number,
      value:10
    },
    pageName:{
      type:String,
      value:"page"
    },
    sizeName:{
      type:String,
      value:"size"
    },
    listName:{
      type:String,
      value:"list"
    },
    totalName:{
      type:String,
      value:"total"
    }
  },

  lifetimes:{
     attached(){
           this.getContainerHeight()
           this.initList()
     }
  },
  /**
   * 组件的初始数据
   */
  data: {
    list:[]
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
     },
    async initList(){
       this.page = 0
       const {} = this.data
       const {list,total} = await this.getPage(this.page)
       this.total = total
       this.setData({
         list
       })
     },
     async handlelower(){
       if(this.data.list?.length>this.total){
          this.page++
          const {list,total} = await this.getPage(this.page)
          console.log(list,total)
          this.total = total
          this.setData({
            list:[...this.data.list,...list]
          })
       }else{
         wx.showToast({
           title: '我也是有底线的....',
           icon:"none"
         })
       }
     },
     async getPage(page){
      const {apiFn,pageName,sizeName,apiConfig,startPage,size,listName,totalName} = this.data
      this.pageConfig = {}
      this.pageConfig[pageName] = page||startPage
      this.pageConfig[sizeName] = size
      const params = {
        ...this.pageConfig,
        ...this.data.params
      }
      const config = {
        ...apiConfig,
        data:params
      }
      const data = await apiFn(config)

      return {
        list:data[listName],
        total:data[totalName]
      }
     },
 
  }
})