// pages/editPassword/editPassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    old:'',
    new:''
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
  
  },
  oldpasswd:function(e){
    this.setData({
       old:e.detail.value
    })
  },
  commitOld:function(){
    let that =this;
    wx.request({
      url: app.globalData.websize+'/api/center/updatePwd.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        type:that.data.type,
        password:that.data.old
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
            that.setData({
              type:2
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
  newpasswd:function(e){
    this.setData({
       new:e.detail.value
    })
  },
  commitNew:function(){
    let that =this;
    wx.request({
      url: app.globalData.websize+'/api/center/updatePwd.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        type:that.data.type,
        password:that.data.new
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
          wx.showToast({
            title:'修改成功！',
            icon:'loading',
          })
          wx.navigateTo({
            url: '../personalCenter/personalCenter'
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
  
  }
})