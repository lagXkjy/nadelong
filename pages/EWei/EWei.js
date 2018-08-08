// distribution/EWei/EWei.js
var common=require('../../common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      hidden: false
    })
    wx.request({
      url: common.config.getFxPhoto,
      method: 'post',
      data: { id: wx.getStorageSync('userid') },
      success: function (res) {
        console.log(res.data);
        if (res.data.result) {
          that.setData({
            userimg: res.data.imgpath
          })
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete:function(){
        that.setData({
          hidden: true
        })
      }
    })
  
  },
  Fangda: function () {
    var current = this.data.userimg
    console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] 
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