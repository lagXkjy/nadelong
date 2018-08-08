// share.js

//我的收益
var common = require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore:true,
    Allurl: common.config.Allurl,
    num:"0",
    all:"0",
      list:[

      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: common.config.TeamDetail,
      data: { UserId: wx.getStorageSync('userid'), FxUserID:0},
      method: "get",
      success: function (res) {
        var json = JSON.parse(res.data.Code);
        console.log(json);
        var Sum = res.data.Sum;
        var numm = json.length;
        if(json.length==0){
            that.setData({
              noMore: false
            })
        }
        that.setData({
          list: json,
          all: Sum,
          num: numm
        })

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
    return {
      title: '纳德隆',
      path: `/pages/empty/empty`,
    }
  }
})