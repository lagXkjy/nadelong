//index.js
//获取应用实例
var common = require('../../../common.js');
var app = getApp();
var userCode = '';
Page({
  data: {
    motto: '',
    userimg: '',
    userInfo: {},
    IsShow: false,
    bggo: "../../images/gong_my_03.png",
    arry: [
      {
        img: "../../../images/shu_03.png",
        title: "我的批发单",
        img2: "../../../images/left-to_03.png",
        index: 0,
        url: "../Order/Order?currentTab=0",
        display: false
      },
      {
        img: "../../../images/wujiaox_03.png",
        title: "我的收藏",
        img2: "../../../images/left-to_03.png",
        index: 1,
        url: "../../Collection/Collection",
        display: false
      },
      {
        img: "../../../images/didian_11.png",
        title: "地址管理",
        img2: "../../../images/left-to_03.png",
        index: 2,
        url: "../address/address",
        display: false
      },
      {
        img: "../../../images/guanliren_14.png",
        title: "管理入口",
        img2: "../../../images/left-to_03.png",
        url: "../../Dealer/Dealer",
        index: 3,
        display: false
      },
    ]
  },
  lianjie: function (e) {
    var dix = e.currentTarget.dataset.index;
    var that = this;
    if (dix == 3) {
      wx.navigateTo({
        url: that.data.arry[dix].url + '?Code=' + userCode
      })
    } else {
      wx.navigateTo({
        url: that.data.arry[dix].url
      })
    }

  },
  //事件处理函数

  onLoad: function () {

  },
  onShow: function () {
    var list = this.data.arry;
    console.log('onLoad')
    var that = this;
    wx.request({
      url: common.config.getUsertype,
      method: 'post',
      data: { UserId: wx.getStorageSync('userid') },
      success: function (res) {
        console.log(res.data);

        if (res.data.Code) {
          userCode = res.data.msg;
          if (res.data.Code) {
            list[3].display = +res.data.msg === 1 ? false : true;
            that.setData({
              arry: list
            })
          }


        } else {
          list[3].display = true;
          that.setData({
            arry: list
          })

        }
      },
      fail: function (res) {

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
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
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