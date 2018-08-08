// newaddress.js
var common=require('../../../common.js');

var addressID=0;
var ISshow=0;
var FxUserId=0;
var allLi;
Page({

  /**
   * 页面的初始数据
   */
  data: {
       DetailedAddress: "",
       FullAddress: "",
       Consignee: "",
       Mobile: ""
  }, 
  
  bindTimeChange: function (e) {
    this.setData({
      DetailedAddress: e.detail.value
    })
  },
   formSubmit:function(e){
     var userid = wx.getStorageSync('userid');
     console.log(e.detail.value)
    var that=this;
    var DetailedAddress = that.data.DetailedAddress
    var FullAddress = e.detail.value.address
    var Consignee = e.detail.value.name 
    var Mobile = e.detail.value.phone
    if (Consignee==""){
      common.modalTap('请输入收货人');
      return false;
    }
    if (Mobile == '') {
      common.modalTap('请输入联系方式');
      return false;
    }
    else{
      var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
      if (!reg.test(Mobile)){
        common.modalTap('请输入正确的联系方式');
        return false;
      }
    }
    if (DetailedAddress=='') {
      common.modalTap('请选择收货地址');
      return false;
    }
    if (FullAddress=='') {
      common.modalTap('请输入详细收货地址');
      return false;
    }

    wx.request({
      url: common.config.NewAddress,
      method:"post",
      data: { userId: userid, Consignee: Consignee, Mobile:Mobile, DetailedAddress: DetailedAddress.join(','), FullAddress:FullAddress},
      success:function(res){
        console.log(res);
        var js = res.data;
        if (js.result) {
          common.DoSuccess(js.msg,1000)
            wx.navigateBack({
              delta: 1
            })
        }
      },fail:function(res){
          console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      ISshow=options.ISshow;
      allLi = options.allLi;
  
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
  },

})