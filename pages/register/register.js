// pages/register/register.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    hasgetCode:'',
    password:'',
    nickname:'',
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
  listenerPhone:function(e){
    this.data.phone = e.detail.value
  },
  listenerCode:function(e){
    this.data.code = e.detail.value
  },
  listenerPassword:function(e){
    this.data.password = e.detail.value
  },
  listenerNickname:function(e){
    this.data.nickname = e.detail.value
  },
  commitFun:function(){
    var reg = /^[a-zA-Z]+\S{5,16}$/;
    let that = this;
    if( !app.isphoneFun(that.data.phone) ){
        that.showMsg('手机号码格式不正确');
        return false;
    }
    console.log(that.data.password)
    if( !reg.test(that.data.password) ){
        that.showMsg('密码必须6-16位为字母，数字');
        return false;
    }
    wx.request({
      url: app.globalData.websize+'/api/auth/register.json', //仅为示例，并非真实的接口地址
      data: {
         phone:that.data.phone,
         code:that.data.code,
         password:that.data.password,
         nickname:that.data.nickname,
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
         wx.setStorageSync('sessionid', reg.data.sessionId);
         wx.navigateTo({
            url: '../index/index'
         })
        }else{
          that.showMsg(res.data.message)
        }
      }
    })
  },
  getCode:function(){
    let that = this;
    if( !app.isphoneFun(that.data.phone) ){
        that.showMsg('手机号码格式不正确');
        return false;
    }
    wx.request({
      url: app.globalData.websize+'/api/auth/sendCode.json', //仅为示例，并非真实的接口地址
      data: {
         phone:that.setData.phone
      },
      method:'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res.data);
        if(res.data.status == 2000000){
          that.setData({
            hasgetCode:'on',
          })
        }else{
          that.showMsg(res.data.message)
        }
      }
    })
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