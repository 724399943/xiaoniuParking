// pages/messageCenter/messageCenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNumber:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getlist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  getlist:function(){
    let that =this;
    wx.request({
      url: app.globalData.websize+'/api/common/listMessage.json', 
      data:{
        sessionId: wx.getStorageSync('sessionid'),
        pageNumber:this.data.pageNumber,
        pageSize:10
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        app.callbackFun(res);
        if(res.data.status == 2000000){
            wx.hideLoading()
           if(res.data.data.length>0){
              that.setData({
                list:that.data.list.concat(res.data.data),
                pageNumber:that.data.pageNumber+1
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
    wx.showLoading({
      mask:true
    })
    this.getlist()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})