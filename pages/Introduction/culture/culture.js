// culture.js
var common = require('../../../common.js')
var page=1;
var list = []
var lenG = list.length;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allurl: common.config.Allurl,
    noMore:true,
    hiddenLoading:true,
      list:[
      
      ]
  },
  lianjie:function(e){
    var dix = e.currentTarget.dataset.index;
    var that = this
    wx.navigateTo({
      url: "../../heritage/heritage?ActivityID="+dix
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that=this
   
  },
  res:function () {
    var that = this
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.Wineculture,
      data:{page:page},
      success: function (res) {
        if (res.data.length>0){
        for (var i=0; i < res.data.length;i++){
          list.push(res.data[i])
        }
        that.setData({
          hiddenLoading: true,
          list: list,
          noMore: true
        })
        console.log(list)
        console.log(res.data.length)
        } else if (res.data.length==0){
          that.setData({
            hiddenLoading: true,
            noMore: false
          })
        }

      },
      fail: function (res) {
        common.modalTap("网络错误")
      }
    })
  },
  lower:function(){
   
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
    list=[];
    page=1
    var that = this
    this.res()
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
    
    page += 1
    this.res()
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