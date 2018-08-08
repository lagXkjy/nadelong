// detail.js
var common=require("../../common.js")
var all
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Allurl: common.config.Allurl,
    ISSHW:true
  },
  shangPin:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    var CommodityId = this.data.list.CommodityList[id].Id
    wx.navigateTo({
      url: '../commodity/commodity?CommodityId=' + CommodityId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 保留小数
  changeTwoDecimal_f:function (x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
      return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0';
    }
    return s_x;
  },
  onLoad: function (options) {
    var that=this;
     all=options;
    wx.request({
      url: common.config.details,
      data:{
        OrderSN: all.OrderSN
      },
      success:function(res){
        console.log(res.data)

        var a = res.data.CreateTime
        var date = new Date(parseInt(a.slice(6)));
        var d = new Date(parseInt(a.slice(6)));
        // //Mon Jan 01 1 08:00:00 GMT+0800 (中国标准时间)
        var M=d.toLocaleDateString('chinese').replace(/年|月|\//g, "-").replace(/日/g, "");
        var Y=d.toLocaleTimeString('chinese', { hour12: false });
        var result = M+"  "+Y
        console.log(res.data.KuaiDiMethod)
        console.log(result)
        if (res.data.KuaiDiMethod=="暂时没有查询记录"){
          var jiaQin = res.data.AllPrice
          that.setData({
            list: res.data,
            LIST: res.data.CommodityList,
            Allprice: that.changeTwoDecimal_f(jiaQin),
            TKuaidiPrice: that.changeTwoDecimal_f(res.data.TKuaidiPrice),
            CreateTime: result,
            ISSHW: false
          })
        }else{
        var TIme = JSON.parse(res.data.KuaiDiMethod).data.length-1
        console.log(TIme)
        var jiaQin = res.data.AllPrice
        that.setData({
          list: res.data,
          LIST: res.data.CommodityList,
          TKuaidiPrice: that.changeTwoDecimal_f(res.data.TKuaidiPrice),
          Allprice: that.changeTwoDecimal_f(jiaQin),
          DINGDan: JSON.parse(res.data.KuaiDiMethod),
          TIme: JSON.parse(res.data.KuaiDiMethod).data[TIme].time,
          CreateTime: result,
          ISSHW: true
        })
      }},
      complete:function(){
        that.BaoLiu()
      }
    })
  },
  // 保留小数
  BaoLiu: function () {
    var that = this
    var list = that.data.LIST
    for (var i = 0; i < list.length; i++) {
      list[i].Price = that.changeTwoDecimal_f(list[i].Price)
      list[i].TPrice = that.changeTwoDecimal_f(list[i].TPrice)
      list[i].HighPraise = that.changeTwoDecimal_f(list[i].HighPraise)
    }
    console.log(123)
    that.setData({
      LIST: list
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