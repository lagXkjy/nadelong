// yyeDetail.js
var app = getApp();
var common = require("../../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates:'',
    dates1:'',
    url: common.config.Allurl,
    num: "200",
    all: "5000",
    motto: '',
    headimgurl: '',
    Name: '',
    userInfo: {},
    list: [

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function (options) {
    var id = options.id;
    
    var url = options.headimgurl;
    var name = options.name;
    console.log(id + "-----------");
    var that = this;
    that.setData({
      dates: options.time,
      dates1: options.time1,
      headimgurl: url,
      Name: name
    });
    wx.request({
      url: common.config.yyeDetail,
      data: { UserId: wx.getStorageSync('userid'), FxUserID: id,time:options.time,time1:options.time1 },
      method: "get",
      success: function (res) {
        var json = JSON.parse(res.data.Code);
        console.log(json);
        var Sum = res.data.Sum;
        console.log("Sum" + Sum);
        that.setData({
          list: json,
          all: Sum
        })

      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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