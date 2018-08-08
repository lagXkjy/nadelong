// pages/empty/empty.js
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
    console.log(options.id)
    console.log(options.id == undefined)
    if (options.id == undefined || options.id == null) {
      wx.setStorageSync("thisFxuser", 0)
    } else {
      wx.setStorageSync("thisFxuser", options.id)
    }
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
    //let userid = wx.getStorageSync('userid')
    //if (!userid) {
      wx.redirectTo({
        url: `../login/login`,
      })
      return
    //}
    // wx.switchTab({
    //   url: '../Newindex/index',
    // })
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