 // address.js
var page=1;
var ISshow = 0;
var userid = wx.getStorageSync('userid');
var allLi;
var common=require('../../../common.js');
var FxUserId=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[
        // { address:"上海市徐汇区零陵路585号 爱邦大厦8楼E座",
        //   name:"黄涛   135****4654",
        //   disabled:true,
        //   select:true,
        //   index:0
        // },
        // {
        //   address: "上海市徐汇区零陵路585号 爱邦大厦8楼E座",
        //   name: "黄涛   135****4654",
        //   disabled: true,
        //   select:false,
        //   index: 1
        // }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ISshow = options.ISshow;
    allLi = options.allLi;
    FxUserId=options.ccid;
  },
  // 单选事件
  bindCheckbox:function(e){
    var idx = e.currentTarget.dataset.index
    var list = this.data.list;
    var selectedAllStatus = list[idx].select
    if (selectedAllStatus){
    for(var i=0;i<list.length;i++){
      list[i].select = selectedAllStatus;
    }
    list[idx].select = !selectedAllStatus;
    console.log(list[idx].select);
    console.log(list[idx].AddressID)
    var addid = list[idx].AddressID;
    wx.request({
      url: common.config.SetDefaultAddress,
      data: { AddressId: addid },
      method: "post",
      dataType: JSON,
      success: function (res) {
        console.log(res.data+"=-=-=-");
        var js = JSON.parse(res.data);
        if (js.result) {
          wx.showToast({
            title: '' + js.msg,
            icon: 'success',
            duration: 2000
          });
          if (ISshow==1){
            wx.navigateBack({
              delta: 1
            })
          }
        }
      }
    })
    this.setData({
      list:list
    })
    }
  },
  bindblur:function(e){
    var value = e.detail.value;
    var idx = e.currentTarget.dataset.index
    var list = this.data.list;
    var show = list[idx].address
    list[idx].address = value
    this.setData({
        list:list
    })
  },
  editall:function(e){
    var idx = e.currentTarget.dataset.index
    var list = this.data.list;
    var show = list[idx].disabled
    list[idx].disabled=!show
    this.setData({
      list:list
    })
    console.log(list[idx].AddressID);
     wx.navigateTo({
       url: '../Upaddress/Upaddress?Id=' + list[idx].AddressID + '&ccid=' + FxUserId,
    })

  },
  delAddress:function(e){
    var that = this;
    //删除
    var idx = e.currentTarget.dataset.index
    var list = this.data.list;
    var show = list[idx].disabled
    list[idx].disabled = !show
    this.setData({
      list: list
    })
    console.log(list[idx].AddressID);
    wx.showModal({
      title: '提示',
      content: '请确认删除收货地址',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //取消收藏
          wx.request({
            url: common.config.DeleteAddress,
            data: { AddIds: list[idx].AddressID },
            dataType: "json",
            method: "post",
            success: function (res) {
              console.log(res.data.result);
              if (res.data.result) {
                wx.showToast({
                  title: '' + res.data.msg,
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(function(){
                 
                  wx.request({
                    url: common.config.MyAddress,
                    data: { userid: wx.getStorageSync('userid'), page: page },
                    method: "get",
                    dataType: JSON,
                    success: function (res) {
                      var json = JSON.parse(res.data);
                      console.log(json)
                      that.setData({
                        list: JSON.parse(json)
                      })
                    }
                  })
                },1000);
              }
            }, fail: function () {

            }
          })
        } else {
          console.log('用户点击确定11123')
        }
      }
    })


  },
  //新增地址 跳转
  navtoNew:function(){
    wx.navigateTo({
      url: '../newaddress/newaddress?ccid=' + FxUserId,
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
    var that = this;

    wx.request({
      url: common.config.MyAddress,
      data: { userid: wx.getStorageSync('userid'), page: page },
      method: "get",
      dataType: JSON,
      success: function (res) {
    
        var json = JSON.parse(res.data);
        console.log(json)
        that.setData({
          list: JSON.parse(json)
        })
      }
    })

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