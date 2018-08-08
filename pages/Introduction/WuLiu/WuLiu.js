// pages/Introduction/WuLiu/WuLiu.js
var common=require("../../../common.js")
var all;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    all = options
  },
  WuLiu:function(){
      var that = this
      var OrderID = all.OrderID;
      wx.request({
        url: common.config.Logisticsview,
        method: "post",
        data: {
          orderid: OrderID
        },
        success: function (res) {
          common.loading(500, "加载中")
          console.log(res.data)
          that.setData({
            list:res.data
          })
        },
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
  this.WuLiu()
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
    return {
      title: '纳德隆',
      path: `/pages/empty/empty`,
    }
  }
})