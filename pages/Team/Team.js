var app = getApp();
var common=require("../../common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore:true,
    num: "0",
    all: "0",
    motto: '',
    userInfo: {},
    list:[
      
    ]
  },
  lianjie:function(e){
    var dix = e.currentTarget.dataset.index;
    var that = this
    wx.navigateTo({
      url: '../teamshare/teamshare?id=' + that.data.list[dix].UserId + '&headimgurl=' + that.data.list[dix].headimgurl + '&name=' + that.data.list[dix].NickName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: common.config.Team,
      data: { UserId: wx.getStorageSync('userid'), page: 1 },
      method: "get",
      dataType: JSON,
      success: function (res) {
        var json = JSON.parse(res.data);
        var js = JSON.parse(json.Code);
        var Rnum = json.Rnum;
        var Sum = json.Sum;
        if(js.length==0){
that.setData({
  noMore:false
})
        }
        that.setData({
          list: js,
          num: Rnum,
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