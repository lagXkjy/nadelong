// newaddress.js
var common=require('../../../common.js');
var ISshow = 0;
var allLi;
var addressID = 0;
var FxUserId=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DetailedAddress: "",
    FullAddress: "",
    Consignee: "",
    Mobile: ""
  }, ConsigneeInput: function (e) {
    this.setData({
      Consignee: e.detail.value
    })
    console.log(this.data.Consignee);
  }, MobilleInput: function (e) {
    this.setData({
      Mobile: e.detail.value
    })
  }, FullAddressInput: function (e) {
    this.setData({
      FullAddress: e.detail.value
    })
  }, saveMsg: function () {
    var that = this;
    console.log(1111111);
    var realyadd='';
    if (typeof (that.data.DetailedAddress).toString() =='object'){
realyadd = that.data.DetailedAddress.join(',');
    }else{
      realyadd = that.data.DetailedAddress.toString();
    }
    if (that.data.Consignee == '') {
      common.modalTap('请输入收货人');
      return false;
    }
    if (that.data.Mobile == '') {
      common.modalTap('请输入联系方式');
      return false;
    }
    else {
      var reg = /^1[3|5|7|8][0-9]{9}$/; //验证规则
      if (!reg.test(that.data.Mobile)) {
        common.modalTap('请输入正确的联系方式');
        return false;
      }
    }
    if (that.data.DetailedAddress == '') {
      common.modalTap('请选择收货地址');
      return false;
    }
    if (that.data.FullAddress == '') {
      common.modalTap('请输入详细收货地址');
      return false;
    }
    console.log("addressID:"+addressID);
    wx.request({
      url: common.config.UpAddress,
      method: "post",
      data: { AddressID: addressID, Consignee: that.data.Consignee, Mobile: that.data.Mobile, DetailedAddress: realyadd, FullAddress: that.data.FullAddress },
      success: function (res) {
        console.log(res);
        var js = res.data;
        if (js.result) {
          wx.showToast({
            title: '' + js.msg,
            icon: 'success',
            duration: 2000
          });
          var url = '../address/address';
          setTimeout(function () {
            if (ISshow == 1) {
              url = '../commodity/commodity?ISshow=' + ISshow + '&allLi=' + allLi + '&ccid=' + FxUserId;
              wx.navigateTo({
                url: url,
              })
            }
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      }, fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ISshow = options.ISshow;
    allLi = options.allLi;
    addressID = options.Id;
    var that=this;
    FxUserId=options.ccid;
    console.log(addressID);
    wx.request({
      url: common.config.getAddress,
      data: { AddressID: addressID },
      method: "post",
      dataType:JSON,
      success: function (res) {
        console.log(res);
        var js = JSON.parse(res.data);
        console.log(js.DetailedAddress);
        that.setData({
          DetailedAddress : js.DetailedAddress.replace('-',','),
          FullAddress : js.FullAddress,
          Consignee : js.Consignee,
          Mobile : js.Mobile
        })
      }, fail(res) {
        console.log("error");

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
  },
  bindTimeChange: function (e) {
    this.setData({
      DetailedAddress: e.detail.value
    })
  }
})