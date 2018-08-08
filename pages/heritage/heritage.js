// heritage.js
var common=require("../../common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      Allurl: common.config.Allurl,
      hiddenLoading:true,
      list:{

      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this;
  that.setData({
    hiddenLoading: false,
  })
  wx.request({
    url: common.config.Chateauactivities,
    data:{
      id: options.ActivityID
    },
    success:function(res){
      console.log(res.data)
      res.data.ActivityTime
      var a = res.data.ActivityTime
      var date = new Date(parseInt(a.slice(6)));
      var d = new Date(parseInt(a.slice(6)));
      // //Mon Jan 01 1 08:00:00 GMT+0800 (中国标准时间)
      var M = d.toLocaleDateString('chinese').replace(/年|月|\//g, "-").replace(/日/g, "");
      var Y = d.toLocaleTimeString('chinese', { hour12: false });
      var result = M + "  " + Y
      // var a = res.data.ActivityTime
      // var date = new Date(parseInt(a.slice(6)));
      //    //Mon Jan 01 1 08:00:00 GMT+0800 (中国标准时间)
      // var result = date.getFullYear() + '年-' + date.getMonth() + '月-' + date.getDate()+'日';
      console.log(result);
      wx.setNavigationBarTitle({ title: res.data.ActivityName})
      that.setData({
        hiddenLoading: true,
        list: res.data,
        date: result
      })
    },
    fail:function(){},
    complete:function(){
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