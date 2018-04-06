// pages/userInfo/userInfo.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{name:'男', val:1},{name:'女', val:2}],
    index: 0,
    date : "1995-1-1",
    userInfo:{},
    avatar:'',
    sex:0,
    brith:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getuserInfo();
    
  },
  getuserInfo:function(){
    let that =this;
    wx.request({
      url: app.globalData.websize+'/api/user/userApiInformation.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
            that.setData({
              userInfo:res.data.data,
              avatar:res.data.data.avatar,
              sex:res.data.data.sex,
              brith:res.data.data.brith
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindUploadHead: function(){
    let that =this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
            url: app.globalData.websize+'/api/lock/fileUploads.json', 
            filePath: tempFilePaths[0],
            name:"file",
            formData:{
              sessionId:wx.getStorageSync('sessionid'),
              files:tempFilePaths[0]
            },
            success: function(res){
              console.log(res.data)
              // that.setData({
              //   avatar : res.data.data.url
              // })
            }
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail)
    this.setData({
      sex: this.data.array[e.detail.value].val
    })
    wx.request({
      url: app.globalData.websize+'/api/user/userApiInformationUpdate.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        sex:this.data.array[e.detail.value].val
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
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
  bindDateChange: function (e) {

    this.setData({
      brith: e.detail.value
    })
    wx.request({
      url: app.globalData.websize+'/api/user/userApiInformationUpdate.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        brith:e.detail.value
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){

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