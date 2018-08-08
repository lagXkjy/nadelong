// Winery.js
var common = require("../../common.js")
var id;
var page = 1;
var list = []
var ALL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Allurl: common.config.Allurl,
    moreDuo:true,
    hiddenLoading:true,
    moreDuo1:true,
    noMore: true,
    noMore1: true,
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
  // Alcohol:function(){
  //   var that=this
  //   wx.navigateTo({
  //     url: '../AlcoholT/Alcohol?id=' + id
  //   })
  // },
  genduo:function(){
    wx.navigateTo({
      url: '../heritage/heritage',
    })
  },
  Lowding: function () {
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
        console.log(res.data == "")
        console.log(page)
        var LIST = res.data
        if (res.data == "") {
          that.setData({
            hiddenLoading: true,
            noMore: false
          })
          if (page == 1) {
            console.log(111)
            that.setData({
              hiddenLoading: true,
              noMore: true,
              noMore1: false
            })
          }
        } else {
          for (var i = 0; i < res.data.length; i++) {
            LIST[i].Price = common.changeTwoDecimal_f(LIST[i].Price)
            LIST[i].HighPraise = common.changeTwoDecimal_f(LIST[i].HighPraise)
            list.push(res.data[i])
          }
          that.setData({
            hiddenLoading: true,
            listL: list,
            noMore: true
          })
        }

      },
      fail: function (res) {
        that.setData({
          hiddenLoading: true,
        })
      }
    })
  },
  LinkTo: function (e) {
    console.log(e)
    var list = this.data.listL
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../commodity/commodity?CommodityId=' + list[id].CommodityId,
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
    ALL = options
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.XieLieXiangQing,
      data:{
        SeriesID: id
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          hiddenLoading: true,
          arry: res.data.data,
          listq:res.data.banner
        })
        console.log(that.data.arry)
      },
      fail:function(res){
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
    list = []
    page = 1
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