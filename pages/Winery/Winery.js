// Winery.js
var common = require("../../common.js")
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreDuo:true,
    hiddenLoading:true,
    moreDuo1:true,
    arry:{
      title: "拉菲古堡（Chateau Lafite Rothschild）",
      name:"法国-波尔多",
      content:"拉菲古堡（Chateau Lafite Rothschild）位于法国波尔多（Bordeaux）上梅多克（Haut-Medoc ）波雅克（Pauillac）葡萄酒产区，是法国波尔多五大一级名庄之一拉菲古堡（Chateau Lafite Rothschild）位于法国波尔多（Bordeaux）上梅多克（Haut-Medoc ）波雅克（Pauillac）葡萄酒产区，是法国波尔多五大一级名庄之一",
      
    },
     moree:"moree",
     moree1: "moree1",
     allurl: common.config.Allurl,
    list:[
        "../../images/puTao_02.jpg", "../../images/puTao_02.jpg",
    ]
  },
  Alcohol:function(){
    var that=this
    wx.navigateTo({
      url: '../Alcohol/Alcohol?id=' + id
    })
  },
  genduo:function(){
    wx.navigateTo({
      url: '../heritage/heritage',
    })
  },
  genduo:function(){

    if(this.data.moree==""){
      this.setData({
        moree: "moree",
        moreDuo:true
      })
    }else{
      this.setData({
        moree: "",
        moreDuo: false
      })
      console.log(123)
    }
    
  },

  genduo1: function () {

    if (this.data.moree1 == "") {
      this.setData({
        moree1: "moree1",
        moreDuo1: true
      })
    } else {
      this.setData({
        moree1: "",
        moreDuo1: false
      })
      console.log(123)
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    id = options.id
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.Chateauinformation,
      data:{
        id: id
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          hiddenLoading: true,
          arry: res.data[0]
        })
        console.log(that.data.arry)
      },
      fail:function(res){
        that.setData({
          hiddenLoading: true,
        })
      }
    })

    wx.request({
      url: common.config.Chateaufigure,
      data: {
        ChateauId: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data
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