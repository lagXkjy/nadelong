var app = getApp()
Page({
  data: {
    display: false,
    motto: '',
    userInfo: {},
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function (options) {
    var code=options.Code;
    if(code=='1001'){
      this.setData({
        display: false
      })
    }
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  // 分销二维码
  Fenxiao:function(){
    wx.navigateTo({
      url: '../EWei/EWei',
    })
  },
  //我的收益
  ShareRre:function(){
    wx.navigateTo({
      url: '../share/share',
    })
  },
  ShareRre1: function () {
    wx.navigateTo({
      url: '../yye/yye',
    })
  },
  Team:function(){
    wx.navigateTo({
      url: '../Team/Team',
    })
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