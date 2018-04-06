// pages/search/search.js
var QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var demo = new QQMapWX({
        key: 'LTUBZ-3BX3S-QT6OC-6ALZW-MSJR6-X2BWZ' // 必填
    });
    var that =this;
    // 调用接口
    demo.reverseGeocoder({
        success: function(res) {
          that.setData({
            address:res.result.address
          })
        }
    });
    
  },
  // 绑定input输入 
  bindKeyInput: function(e) { 
        var that = this; 
        // 实例化API核心类
        var demo = new QQMapWX({
            key: 'LTUBZ-3BX3S-QT6OC-6ALZW-MSJR6-X2BWZ' // 必填
        });
         console.log(e.detail.value)
        // 调用接口
        demo.getSuggestion({
            keyword: e.detail.value,
            success: function(res) {
              console.log(res)
              that.setData({
                  list:res.data
              })
            },
            fail: function(res) {
               // console.log(res);
            },
            complete: function(res) {
                //console.log(res);
            }
        });
  },
  goto:function(e){
      var key = e.currentTarget.dataset.item
      console.log(key);
      var data = this.data.list[key].location
      console.log(data)
      wx.navigateTo({
         url: '../index/index?longitude='+data["lng"]+'&latitude='+data['lat']
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