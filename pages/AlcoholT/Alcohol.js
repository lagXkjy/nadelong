// Alcohol.js
var common=require("../../common.js")
var page=1;
var list=[]
var ALL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Allurl: common.config.Allurl,
    noMore: true,
    noMore1:true,
    hiddenLoading:true,
  },
  Lowding:function(){
    var that = this
    that.setData({
      hiddenLoading: false,
    })
    console.log(ALL.id)
    wx.request({
      url: common.config.XieLieXiangQingJiu,
      data: {
        SeriesID: ALL.id,
        page: page
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data=="")
        console.log(page)
        var LIST=res.data
        if (res.data==""){
          that.setData({
            hiddenLoading: true,
            noMore: false
          })
          if (page == 1){
            console.log(111)
            that.setData({
              hiddenLoading: true,
              noMore: true,
              noMore1: false
            })
          }
        }else{
          for (var i = 0; i < res.data.length; i++) {
            LIST[i].Price = common.changeTwoDecimal_f(LIST[i].Price)
            LIST[i].HighPraise = common.changeTwoDecimal_f(LIST[i].HighPraise)
            list.push(res.data[i])
          }
          that.setData({
            hiddenLoading: true,
            list: list,
            noMore: true
          })
        }
       
      },
      fail:function(res){
        that.setData({
          hiddenLoading: true,
        })
      }
    })
  },
  LinkTo:function(e){
    console.log(e)
    var list=this.data.list
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../commodity/commodity?CommodityId=' + list[id].CommodityId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    ALL = options
  
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
    list=[]
    page=1
    this.Lowding()
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
    this.Lowding()
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