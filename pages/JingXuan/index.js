// pages/JingXuan/index.js
var common = require("../../common.js")
var LIST=[]
var page=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading:true,
    Allurl: common.config.Allurl,
    noMore:true,
    TnoMore:true,
  },
  GoToNew:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../WineryTw/Winery?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },
// 加载数据
Contnet:function(page){
  var that = this
  wx.request({
    url: common.config.JinPinLieBiao,
    data: {
      page: page
    },
    success: function (res) {
      var list = res.data.data
      if (list.length > 0) {
        for(var i=0;i<list.length;i++){
          LIST.push(list[i])
        }
        that.setData({
          hiddenLoading: true,
          list: LIST
        })
      } else if (list.length == 0) {
        if (page == 1) {
          that.setData({
            hiddenLoading: true,
            noMore: true,
            TnoMore: false,
          })
        } else {
          that.setData({
            hiddenLoading: true,
            noMore: false,
            TnoMore: true,
          })
        }
      }

      console.log(res)
    },
    fail: function (res) {
      console.log(res)
    },
    complete(res) {
      that.setData({
        hiddenLoading: true,
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
    var that = this
    page=1
    LIST=[]
    that.setData({
      hiddenLoading: false,
    })
    this.Contnet(page)
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
    page++
    this.Contnet(page)
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