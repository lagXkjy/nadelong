var common=require("../../common.js")
var all;
var   ConsigneePhone= ""
var   ConsigneeEmail= ""
var   ConsigneeFax= ""
var address;
var orderId;
var FxUserId=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      select:false,
      DiZhi:true,
      shuohao:false,
      hiddenLoading:true,
      array: ['企业', '个体'],
      index:0,
      Allurl: common.config.Allurl,
      list:[
        {
          title:"1982正牌大拉菲 拉菲古堡干红一级庄",
          url:"../../images/daizhifu_03.jpg",
          price:"48.00",
          xiaoji:"48.00",
          exchange:"7.9",
          guanshui:"14%",
          gprice:"53.09",
          xiaofei:"10%",
          tax:"48.03",
          zenzhi:"17%",
          zenzhip:"81.65"
        }
        ],
      priceall:[
        {
          title:"1、1982正牌大拉菲 拉菲古堡干红",
          price:"1136.00"
        },
      ]
  },

  // 保留小数
  changeTwoDecimal_f: function (x) {
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
  //计算规则
  rule: function () {
    wx.navigateTo({
      url: '../rule/rule',
    })
  },
//选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    ConsigneePhone = this.data.array[e.detail.value]
    console.log(ConsigneePhone)
    this.setData({
      index: e.detail.value
    })
    if (e.detail.value==1){
      this.setData({
        shuohao: true
      })
    }else{
      this.setData({
        shuohao: false
      })
    }
  },
  
  switch1Change:function(e){
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    console.log(e.detail.value)
    if (e.detail.value){ 
      ConsigneePhone = "企业"
    }else{
      ConsigneePhone = ""
    }
    this.setData({
      select: e.detail.value
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    all = options;
    if (options.ccid != 'undefined' && options.ccid!=null){
      FxUserId = options.ccid;
    }
  },
  // 保留两位小数
  BaoLiu:function(){
    var that=this
    var list=that.data.list
    for(var i=0;i<list.length;i++){
      list[i].Price = that.changeTwoDecimal_f(list[i].Price)
      list[i].TPrice = that.changeTwoDecimal_f(list[i].TPrice)
      list[i].HighPraise = that.changeTwoDecimal_f(list[i].HighPraise)
    }
    console.log(123)
    that.setData({
      list:list
    })
  },
  //渲染订单
  DingDanT:function(){
    var that = this
    that.setData({
      hiddenLoading: false,
    })
    console.log(wx.getStorageSync("userid") + "." + all.allLi)
    wx.request({
      url: common.config.Theorderdetails,
      method: "get",
      data: {
        userid: wx.getStorageSync("userid"),
        cids: all.allLi,
      },
      success: function (res) {
        var All = res.data
        console.log(All)

        if (All.Address == null) {
          console.log(All.Address + "123")
          for (var i = 0; i < All.CommodityList.length; i++) {
            All.CommodityList[i].HaiguanShui = All.CommodityList[i].HaiguanShui,
            All.CommodityList[i].Enterce = All.CommodityList[i].Enterce
            All.CommodityList[i].AddedValue = All.CommodityList[i].AddedValue
            All.CommodityList[i].OPrice = All.CommodityList[i].OPrice
          }
          that.setData({
            hiddenLoading: true,
            list: All.CommodityList,
            FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
            TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
            AllPrice: that.changeTwoDecimal_f(All.AllPrice),
            FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),
            DiZhi: false
          })
        } else {
          console.log(All.Address)
          for (var i = 0; i < All.CommodityList.length; i++) {
            All.CommodityList[i].HaiguanShui = All.CommodityList[i].HaiguanShui
            All.CommodityList[i].Enterce = All.CommodityList[i].Enterce
            All.CommodityList[i].AddedValue = All.CommodityList[i].AddedValue
            All.CommodityList[i].OPrice = All.CommodityList[i].OPrice
          }
          that.setData({
            hiddenLoading: true,
            list: All.CommodityList,
            Consignee: All.Address.Consignee,
            DetailedAddress: All.Address.DetailedAddress,
            Mobile: All.Address.Mobile,
            FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
            TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
            AllPrice: that.changeTwoDecimal_f(All.AllPrice),
            FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),
            AddressID: All.Address.AddressID,
            FullAddress: All.Address.FullAddress,
            DiZhi: true
          })
        }

      },
      fail:function(){
        that.setData({
          hiddenLoading: true,
        })
      },
      complete:function(){
        that.BaoLiu()
      }
    })
   
  },

  //单独订单

  DingDan: function () {
    var that = this
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.DanDuDingDa,
      method: "get",
      data: {
        userid: wx.getStorageSync("userid"),
        CommodityId: all.CommodityId,
        commoditynum: all.sum
      },
      success: function (res) {
        var All = res.data
        console.log(All)
        if (All.Address == null) {
          console.log(All.Address + "123")
          for (var i = 0; i < All.CommodityList.length; i++) {
            All.CommodityList[i].HaiguanShui = All.CommodityList[i].HaiguanShui
            All.CommodityList[i].Enterce = All.CommodityList[i].Enterce
            All.CommodityList[i].AddedValue = All.CommodityList[i].AddedValue
            All.CommodityList[i].OPrice = All.CommodityList[i].OPrice
          }
          that.setData({
            hiddenLoading: true,
            list: All.CommodityList,
            FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
            TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
            AllPrice: that.changeTwoDecimal_f(All.AllPrice),
            FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),
            DiZhi: false
          })
        } else {
          console.log(All.Address)
          for (var i = 0; i < All.CommodityList.length; i++) {
            All.CommodityList[i].HaiguanShui = All.CommodityList[i].HaiguanShui
            All.CommodityList[i].Enterce = All.CommodityList[i].Enterce
            All.CommodityList[i].AddedValue = All.CommodityList[i].AddedValue
            All.CommodityList[i].OPrice = All.CommodityList[i].OPrice
          }
          that.setData({
            hiddenLoading: true,
            list: All.CommodityList,
            Consignee: All.Address.Consignee,
            DetailedAddress: All.Address.DetailedAddress,
            Mobile: All.Address.Mobile,
            FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
            TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
            AllPrice: that.changeTwoDecimal_f(All.AllPrice),
            FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),
            AddressID: All.Address.AddressID,
            FullAddress: All.Address.FullAddress,
            DiZhi: true
          })
          
        }
      
      },
      fail:function(){
        that.setData({
          hiddenLoading: true,
        })
      },
      complete:function(){
        that.BaoLiu()
      }
    })
   
  },
  //
  ToAddress:function(){
    wx.navigateTo({
      url: '../Introduction/address/address?ISshow=1&ccid=' + FxUserId,
    })
  },
  addAddress:function(){
    wx.navigateTo({
      url: '../Introduction/newaddress/newaddress?ISshow=1&allLi=' + all.allLi + '&ccid=' + FxUserId,
    })
  },
  //提交订单
  formSubmit: function (e) {
   
    var that = this
    that.setData({
      hiddenLoading: false,
    })
    if (all.OrderID===undefined){
      address = that.data.AddressID
    }else{
      address = that.data.Consignee
    }
    
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (that.data.select){
      ConsigneeEmail = e.detail.value.numT;
      ConsigneeFax = e.detail.value.numS;
    }
    if (this.data.select){
      if ((e.detail.value.numS == "" || e.detail.value.numT=="") && ConsigneePhone=="企业") {
       common.modalTap("发票内容不完善")
     }else{
        if (address == undefined) {
         
         common.modalTap("请添加地址")
         console.log(all.OrderID)
         
       } else {
         if (all.types == 0 ) {
           that.setData({
             hiddenLoading: true,
           })
           this.orderconfirmation()
         } else {
           that.setData({
             hiddenLoading: true,
           })
           this.Shoppingcart()
           console.log(address)
         }
       }
     }
   }else{
        if (address == undefined) {
          common.modalTap("请添加地址")
        }else{
          if (all.types == 0) {
            that.setData({
              hiddenLoading: true,
            })
            this.orderconfirmation()
          } else {
            that.setData({
              hiddenLoading: true,
            })
            this.Shoppingcart()
            console.log(address)
            console.log(address == undefined)
          }
        }
   }
   //
    that.setData({
      hiddenLoading: true,
    })
  },
  //单独生成订单

  orderconfirmation:function(){
    var that=this
    that.setData({
      hiddenLoading: false,
    })
    var value = wx.getStorageSync('key')
    if (value == "") {
      wx.setStorageSync('key', '123')
      
// 防止重复提交
    if (all.OrderID != undefined ) {
      if (all.ISZ == 1){
        orderId = all.OrderID
        console.log(123)
        that.moneyPay()
      } else if (all.ISZ==0 ){
        orderId = all.OrderID
        var that = this
        wx.request({
          url: common.config.ShoppingAgain,
          data: {
            userid: wx.getStorageSync("userid"),
            OrderSN: orderId,
            ConsigneePhone: ConsigneePhone,
            ConsigneeEmail: ConsigneeEmail,
            ConsigneeFax: ConsigneeFax,
            AddressID: that.data.AddressID,
          },
          success: function (res) {
            console.log(res)
            if (res.data.status) {
              that.setData({
                hiddenLoading: true,
              })
              orderId = res.data.OrderId
              that.moneyPay()
            } else {
              that.setData({
                hiddenLoading: true,
              })
              common.modalTap(res.data.res)
            }
          },
          
        })
      }
      
    } else {
    wx.request({
      url: common.config.OrderConfirmation,
      data: {
        userid: wx.getStorageSync("userid"),
        commodityid: all.CommodityId,
        commoditynum: all.sum,
        ConsigneePhone: ConsigneePhone,
        ConsigneeEmail: ConsigneeEmail,
        ConsigneeFax: ConsigneeFax,
        AddressID: address,
        FxUserId: FxUserId
      },
      success:function(res){
        if (res.data.status) {
          orderId = res.data.OrderId
          that.setData({
            hiddenLoading: true,
          })
          that.moneyPay()
        }else{
          common.modalTap(res.data.res)
          that.setData({
            hiddenLoading: true,
          })
        }
      }
      })
    }
    }else{
      console.log("重复提交")
      
    }
  },

//提交订单
  Shoppingcart: function () {
    var that = this
    var value = wx.getStorageSync('key')
    if (value==""){
      wx.setStorageSync('key', '123')
      wx.request({
        url: common.config.ShoppingCSrt,
        data: {
          userid: wx.getStorageSync("userid"),
          cids: all.allLi,
          ConsigneePhone: ConsigneePhone,
          ConsigneeEmail: ConsigneeEmail,
          ConsigneeFax: ConsigneeFax,
          AddressID: address,
        },
        success: function (res) {
          console.log(res)
          if (res.data.status) {
            orderId = res.data.OrderId
            that.moneyPay()
          } else {
            common.modalTap(res.data.res)
          }
        },
        fail:function(res){
          common.modalTap(res.data)
        },
        complete:function(){

        },
      })
    }else{
      console.log("重复提交")
    }
    
    
  },
 //改变订单状态
 ChangeOrder:function(){
   console.log(123)
   wx.request({
     url: common.config.ChangeOrder,
     method:"post",
     data:{
       orderId: orderId
     },
     success:function(res){
       console.log(res)
       if(res.data.Code){
         common.DoSuccess("购买完成", 500);
         wx.setStorageSync('key', '')
         setTimeout(function () {
           wx.switchTab({
             url: '../Introduction/me/me'
           })
         }, 1000)
       }else{
         common.modalTap(res.data.msg)
         wx.setStorageSync('key', '')
       }
     },
     fail:function(res){
       common.modalTap(res.data.msg)
       wx.setStorageSync('key', '')
     },
   })
 },
//  购买接口
moneyPay:function(){
  var that=this
  var openid = wx.getStorageSync('openid')
  console.log(openid)
  console.log(that.data.AllPrice)
  wx.request({
    url: common.config.payMoney,
    method:"post",
    data:{
      code: openid,
      ordercode: orderId,
      price:that.data.AllPrice
    },
    success:function(res){
      console.log(res.data)
      // 支付接口
      console.log()
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: "MD5",
        paySign: res.data.paySign,
        success:function(res){
          //改变订单状态
          common.DoSuccess("支付成功", 500);
          console.log(res.data)
          that.ChangeOrder()
        },
        fail:function(res){
          common.DoSuccess("取消支付", 500);
          wx.setStorageSync('key', '')
          setTimeout(function () {
            wx.switchTab({
              url: '../Introduction/me/me'
            })
          }, 1000)
         
        },
      })
     
    },
    fail:function(res){
      console.log(res.data)
    },
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
    wx.setStorageSync('key', '')
    var that=this
    console.log(all.OrderID)
    if (all.OrderID ==undefined){
      console.log(1111)
      if (all.ISshow == 0) {
        that.DingDan()
        
      } else {
        that.DingDanT()
       
      }
    }else{
      if (all.ISZ==1){
        wx.request({
          url: common.config.details,
          data: {
            OrderSN: all.OrderID
          },
          success: function (res) {
            var All = res.data
            console.log(res)
            that.setData({
              list: All.CommodityList,
              Consignee: All.Consignee,
              DetailedAddress: All.ConsigneeAddress,
              Mobile: All.ConsigneeMobile,
              FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
              TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
              AllPrice: that.changeTwoDecimal_f(All.AllPrice),
              FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),
              DiZhi: true
            })
            that.BaoLiu()
          },
          complete: function () {
            that.BaoLiu()
          }
        })
       
      }else{
        wx.request({
          url: common.config.buyAgain,
          data: {
            OrderSN: all.OrderID,
            userid: wx.getStorageSync('userid')
          },
          success: function (res) {
            var All = res.data
            console.log(All)

            if (All.Address == null) {
              console.log(All.Address + "123")
              for (var i = 0; i < All.CommodityList.length; i++) {
                All.CommodityList[i].HaiguanShui = All.CommodityList[i].HaiguanShui
                All.CommodityList[i].Enterce = All.CommodityList[i].Enterce
                All.CommodityList[i].AddedValue = All.CommodityList[i].AddedValue
                All.CommodityList[i].OPrice = All.CommodityList[i].OPrice
              }
              that.setData({
                list: All.CommodityList,
                FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
                TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
                AllPrice: that.changeTwoDecimal_f(All.AllPrice),
                FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),

                DiZhi: false
              })
              that.BaoLiu()
            } else {
              console.log(All.Address)
              for (var i = 0; i < All.CommodityList.length; i++) {
                All.CommodityList[i].HaiguanShui = All.CommodityList[i].HaiguanShui
                All.CommodityList[i].Enterce = All.CommodityList[i].Enterce
                All.CommodityList[i].AddedValue = All.CommodityList[i].AddedValue
                All.CommodityList[i].OPrice = All.CommodityList[i].OPrice
              }
              that.setData({
                list: All.CommodityList,
                Consignee: All.Address.Consignee,
                DetailedAddress: All.Address.DetailedAddress,
                Mobile: All.Address.Mobile,
                FuwuPrice: that.changeTwoDecimal_f(All.FuwuPrice),
                TKuaidiPrice: that.changeTwoDecimal_f(All.TKuaidiPrice),
                AllPrice: that.changeTwoDecimal_f(All.AllPrice),
                FuwuPercent: that.changeTwoDecimal_f(All.FuwuPercent),
                AddressID: All.Address.AddressID,
                FullAddress: All.Address.FullAddress,
                DiZhi: true
              })
            } 
           
          },
          complete: function () {
            that.BaoLiu()
          }
        })
      }
  }
   
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