var page = 1;
var kong = [];
var old = [];
var common = require("../../common.js");
// var LIST=[];
// Collection.js
var count=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgContent:'您暂时还没有收藏任何商品',
    selectedAllStatus: "true",
    xuanall: "全选",
    list: [],
    noMore: true,
  },
  LianJie:function(e){
    var idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../commodity/commodity?CommodityId=' + idx,
    })
  },
  bindCheckbox: function (e) {
    var arry = [];
    var idx = e.currentTarget.dataset.index;
    var list = this.data.list;
    var show = list[idx].show;
    list[idx].show = !show;
    kong = [];
    // 是否全选
    for (var i = 0; i < list.length; i++) {
      if (list[i].show) {
        var pp;
        arry.push(1)
      } else {
        arry.splice(1)
        kong.push(list[i].Id);
      }
      if (arry.length > 0) {
        pp = false
      } else {
        pp = true
      }
    }
    console.log("__Kong__" + kong);
    this.setData({
      list: list,
      selectedAllStatus: !pp
    })
    this.sum();
  },
  sum: function () {
    var carts = this.data.list;
    var zong = 0;
    for (var i = 0; i < carts.length; i++) {
      if (!carts[i].show) {
        zong += carts[i].index
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      list: carts,
      tale: zong
    });
  },
  bindSelectAll: function (e) {

    kong = [];
    var selectedAllStatus = this.data.selectedAllStatus;
    var list = this.data.list;
    selectedAllStatus = !selectedAllStatus;

    for (var i = 0; i < list.length; i++) {
      list[i].show = selectedAllStatus;
      kong.push(list[i].Id);
    }

    this.setData({
      list: list,
      selectedAllStatus: selectedAllStatus
    });

  }, CancelConlect: function () {
    var that = this;
    console.log(kong);
    if (kong.length <= 0) {
      return;
    }
    wx.showModal({
      title: '提示',
      content: '请确认取消收藏',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          //取消收藏
          wx.request({
            url: common.config.CancelCollect,
            data: { userId: wx.getStorageSync('userid'), ids: kong },
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
                  wx.request({
                    url: common.config.MyCollection,
                    data: { userid: wx.getStorageSync('userid'), page: page },
                    method: "get",
                    dataType: JSON,
                    success: function (res) {
                      var json = JSON.parse(res.data);
                      console.log(json);
                      var js = JSON.parse(json.Code)
                      that.setData({
                        list: js
                      })
                      if (count < js.length) {
                        count += 10;
                      } else {
                        page--;
                        if (js.length == 0) {
                          that.setData({
                            noMore: false,
                            msgContent: '您暂时还没有收藏任何商品'
                          })

                        } else {
                          that.setData({
                            noMore: false,
                            msgContent: '没有更多数据了'
                          })
                        }
                      }

                    }
                  })
               
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: common.config.MyCollection,
      data: { userid: wx.getStorageSync('userid'), page: 1 },
      method: "get",
      dataType: JSON,
      success: function (res) {
        console.log(res)
        var json = JSON.parse(res.data);
     
        var js=JSON.parse(json.Code)
        console.log(js);
        console.log(js.length);
        if (js.length==0) {
          that.setData({
            noMore: false,
          })
        }
        that.setData({
          list:js
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
    page++;
    var that = this;
    wx.request({
      url: common.config.MyCollection,
      data: { userid: wx.getStorageSync('userid'), page: page },
      method: "get",
      dataType: JSON,
      success: function (res) {
        var json = JSON.parse(res.data);
        console.log(json);
        var js= JSON.parse(json.Code);
        console.log("count:" + count);
        
        if(count<js.length){
          console.log('有数据');
          count+=10;
          that.setData({
            list: js,
            noMore: true,
          })
        }else{
          page--;
          if (js.length==0){
           that.setData({
             noMore: false,
             msgContent: '您暂时还没有收藏任何商品'
           })

         }else{
            that.setData({
              noMore: false,
              msgContent: '没有更多数据了'
            })
         }
        }
        
      }
    })
  },  // 跳转
  navtoCommodity: function () {
    wx.navigateTo({
      url: '',//商品详情页
    })
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