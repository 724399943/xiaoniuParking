// pages/editPlateNumber/editPlateNumber.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    licensePlate:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  chageName:function(reg){
    this.setData({
       licensePlate:reg.detail.value
    })
  },
  commitFun:function(){
    wx.request({
      url: app.globalData.websize+'/api/user/userApiInformationUpdate.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        licensePlate:this.data.licensePlate
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
          wx.navigateTo({
            url: '../userInfo/userInfo'
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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