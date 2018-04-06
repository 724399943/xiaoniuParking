// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden:false,
    errorMsg:'',
    popmsg:false,
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
  showMsg:function(msg){
    clearTimeout();
    let that = this
    that.setData({
      popmsg:true,
      errorMsg:msg,
    })
    var t = setTimeout(function(){
      console.log('dsds')
      that.setData({
        popmsg:false
      })
    },2000);
  },
  formSubmit:function(e){
    let that =this
    console.log(e.detail.value)
    if( !app.isphoneFun(e.detail.value.phone) ){
        that.showMsg('手机号码格式不正确');
        return false;
    }
    wx.request({
      url: app.globalData.websize+'/api/auth/login.json', //仅为示例，并非真实的接口地址
      data:e.detail.value,
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        if(res.data.status == 2000000){
         wx.setStorageSync('sessionid', res.data.data.sessionId);
         wx.setStorageSync('avatar', res.data.data.avatar);
         wx.setStorageSync('nickName', res.data.data.nickName);
         console.log(wx.getStorageSync('sessionid'))
         wx.navigateTo({
            url: '../index/index'
         })
        }else{
          that.showMsg(res.data.message)
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