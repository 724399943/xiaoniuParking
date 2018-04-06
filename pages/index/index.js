//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    markers: [

    ],
    controls:{


    },
    longitude:0,
    latitude: 0,
    showModalStatus: false,
    state:0,
    detail:{},
    timetxt:'预计时长',
    hour:0,
    checked:1,
    hasorder:0,
    orderDetail:{},
    showorderDetail:false,
    cancelDetail:{},
  },
  onReady: function (e) {
    wx.hideLoading()
    this.mapCtx = wx.createMapContext('myMap')
    var that =this;
    console.log(that.data.longitude)
    if(this.data.longitude == 0){
      this.gethearadr()
    }else{
      this.getAdrDate();
    }
    this.loadState();


  },
  onLoad: function (e) {
    wx.showLoading({})
    if(e.longitude){
      this.setData({
        longitude:e.longitude,
        latitude:e.latitude
      })
    }
  },
  gethearadr:function(){
    var that =this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude

        })
        console.log(res.longitude, res.latitude)
        that.getAdrDate();

      },
      complete:function (res){
        
      }
    })
  },
  searchFun:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //事件处理函数
  loadState: function() {
    var that = this;
    wx.request({
      url: app.globalData.websize+'/api/index/state.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
           res.data.data.time = parseInt(res.data.data.time/60000)
           if(res.data.data.state <4){
              that.setData({
                orderDetail:res.data.data,
                hasorder:1
              })
           }else{
              that.setData({
                orderDetail:res.data.data,
                hasorder:0
              })
           }
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  daohang:function(reg){
    let data = reg.target.dataset.json
    wx.openLocation({  
      latitude: data.locLat,  
      longitude: data.locLng,  
      scale: 18,  
      name: data.unit,  
      address:data.address  
    })  
  },
  cancelorder:function(){
    var that =this;
    wx.request({
      url: app.globalData.websize+'/api/staffIndex/subscribeCancel.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        lockId:this.data.orderDetail.lockId
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
           that.setData({
              cancelDetail:res.data.data
           })
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  goingFun:function(){
    this.setData({
      showorderDetail:true,
      hasorder:0
    })
  },
  choseFun:function(){
    let that =this
    wx.showActionSheet({
      itemList: ['所有', '1小时', '2小时','3小时','4小时'],
      itemColor:'#f05b48',
      success: function(res) {
        that.data.hour = res.tapIndex;
        if(res.tapIndex>0){
          that.setData({
              timetxt:res.tapIndex+'小时'
          })
        }else{
          that.setData({
              timetxt:'所有'
          })
        }
        that.getAdrDate();
      }
    })
  },
  getAdrDate:function(){
    let that = this ;
    console.log(wx.getStorageSync('sessionid'));
    wx.request({
      url: app.globalData.websize+'/api/index/index.json', 
      data:{
        latitude:that.data.latitude,
        longitude:that.data.longitude,
        sessionId: wx.getStorageSync('sessionid'),
        hour:that.data.hour
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
          let arr = [{id:0,iconPath:'../images/wei.png',latitude:23.129163,longitude:113.264435,width:50,height:50,price:'sds'}];
          let list = res.data.data;
          for (var i = 0 ; i<list.length; i++) {
            let ico = '';
            if(list[i].shareState == 1){
              ico = '../images/wei.png'
            }else{
              ico = '../images/car.png'
            }
            arr.push({id:list[i].id,iconPath:ico,price:list[i].price,latitude:list[i].latitude,longitude:list[i].longitude,width:50,height:50,title:list[i].price})
          }
          that.setData({
              markers:arr
          })
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  openDetaiFun:function(reg){
    console.log(reg.markerId);
    let that = this
    wx.request({
      url: app.globalData.websize+'/api/index/beforeCancel.json', 
      data:{
        pId:reg.markerId,
        sessionId: wx.getStorageSync('sessionid'),
        latitude:that.data.latitude,
        longitude:that.data.longitude
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
          that.setData({
             state:res.data.data.state,
             detail:res.data.data
          })
        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })

  },
  yuyueFun:function(reg){
    this.setData({
      showModalStatus:true,
    })
    console.log(reg)
  },
  commityuyue:function(){
    let that =this
    wx.request({
      url: app.globalData.websize+'/api/index/subscribe.json', 
      data:{
        pId:that.data.detail.id,
        sessionId: wx.getStorageSync('sessionid'),
        state:that.data.checked
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){

        }else{
          wx.showToast({
            title:res.data.message,
            icon:'loading',
          })
        }
      }
    })
  },
  changeico:function(reg){
    let num = reg.target.dataset.state;
    console.log(num);
    this.setData({
      checked:num
    })
  },
  cancelyy:function(){
    this.setData({
      showModalStatus:false
    })
  },
  closePopFun:function(reg){
    this.setData({
      state:0
    })
  },
  saoFun(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.request({
            url: app.globalData.websize+'/api/index/open.json', 
            data:{
              no:res.result,
              sessionId: wx.getStorageSync('sessionid')
            },
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
              app.callbackFun(res.data);
              if(res.data.status == 2000000){
                console
              }else{
                wx.showToast({
                  title:res.data.message,
                  icon:'loading',
                })
              }
            }
        })
      }
    })
  },
  rebackFun(){
    console.log('dd')
    this.mapCtx.moveToLocation();
  },
  touserFun: function () {
    wx.navigateTo({
      url: '../personalCenter/personalCenter'
    })
  },
    closeFun: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.animationFun(currentStatu)
  },
  //  动画部分
  animationFun: function (currentStatu) {
    // 1创建动画实例   
    var animation = wx.createAnimation({
      duration: 300,  //  动画时长  
      timingFunction: "step-start", //  动画第一帧就跳至结束状态直到结束 
      delay: 0,  // 0则不延迟  
      opacity: 0 //  透明度，参数范围 0~1
    });

    // 2执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 3导出动画
    this.setData({
      animationData: animation.export(),
      showModalStatus: this.data.showModalStatus ? false : true
    })
  }
})
