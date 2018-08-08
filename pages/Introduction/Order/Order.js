// Order.js
var common = require("../../../common.js")
var secondId=0;
var page=1;
var list=[];
var LeiXIng;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noMore:true,
    hiddenLoading:true,
    noMoreA:true,
    LeiXIng: LeiXIng,
    Allurl: common.config.Allurl,
    navbar: ['全部', '待支付', '待收货' ,'已完成'],
    currentTab: 0,
    List:[
      {
        top:"已完成",
        url:"../../../images/daizhifu_03.jpg",
        title:"1982正牌大拉菲 拉菲古堡干红一级庄",
        price:"48.00",
        dengdai:"676.27",
        zhifu:"去支付",
        num:"X1",
        btn:"去评价",
        show:false,
        btn2:"再次购买",
        red:"",
        index:0,
        lianjie:"../Evaluation/Evaluation"
      },
      {
        top: "待支付",
        url: "../../../images/daizhifu_03.jpg",
        title: "1982正牌大拉菲 拉菲古堡干红一级庄",
        price: "48.00",
        dengdai: "676.27",
        zhifu: "去支付",
        num: "X1",
        btn: "去评价",
        show: true,
        btn2: "去支付",
        red: "colorred",
        index:1,
        lianjie: "../Evaluation/Evaluation"

      }

    ]
  },
  // 保留两位小数
  BaoLiu:function(){
    var that=this
    var list = that.data.List
    console.log(list);
    for(var i=0;i<list.length;i++){
      list[i].ActualPrice = common.changeTwoDecimal_f(list[i].ActualPrice)
      for (var j = 0; j<list[i].Commlist.length;j++){
        if (isNaN(list[i].Commlist[j].SalePrice)){
          return  false
        }else{
          list[i].Commlist[j].SalePrice = common.changeTwoDecimal_f(list[i].Commlist[j].SalePrice)
          list[i].Commlist[j].HighPraise = common.changeTwoDecimal_f(list[i].Commlist[j].HighPraise)
        }
      }
    }
    that.setData({
      List:list
    })
  },
  //评价
  pingjia:function(e){
    var Ali=[];
    var dix = e.currentTarget.dataset.index;
    for (var i = 0; i < this.data.List[dix].Commlist.length;i++){
      Ali.push(this.data.List[dix].Commlist[i].CommodityId);
    }
    var OrderID = this.data.List[dix].OrderID;
    var that = this
    wx.navigateTo({
      url: "../Evaluation/Evaluation?CommodityId=" + Ali + "&OrderID=" + OrderID
    })
  },

  //订单详情
  GoDdetil:function(e){
    var idx = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var OrderSN = this.data.List[idx].OrderID
    var CommodityId = list[idx].Commlist[id].CommodityId
    wx.navigateTo({
      url: '../../detail/detail?OrderSN=' + OrderSN + "&CommodityId=" + CommodityId
    })
    console.log(123)
  },
  //渲染订单
  qingqiu: function (e, page){
    var that=this
    that.setData({
      noMore: true,
      hiddenLoading: false,
    })
    console.log(888)
    wx.request({
      url: common.config.orders,
      method:"post",
      data: {
        userId: wx.getStorageSync("userid"),
        staus: e,
        page: page
      },
      success: function (res) {
        
       console.log(res)
        if (res.data.Code!=""){
          for (var i = 0; i < res.data.Code.length; i++) {
            list.push(res.data.Code[i])
          }
          for(var j=0;j<list.length;j++){
            list[j].Index=j
          }
          that.setData({
            List: list,
            noMore: true,
            hiddenLoading:true,
            noMoreA: true
          })
          console.log(that.data.List)
        } else if (res.data.Code ==""){
          that.setData({
            hiddenLoading: true,
            noMore: false,
            noMoreA: true,
           
          })
          if (page == 1) {

            that.setData({
              hiddenLoading: true,
              List: "",
              noMoreA:false
            })
          }
          console.log(page)
        } 
      },
      complete:function(){
        that.BaoLiu()
        that.setData({
          hiddenLoading: true,
        })
      }
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
   
    var that = this
    if (e.currentTarget.dataset.idx == 0) {
      wx.setNavigationBarTitle({ title: '全部批发单' })
      list=[]
      page = 1
      that.setData({
        LeiXIng: "",
      })
      that.qingqiu('', page)
      console.log(123)
      secondId=0
    }
    if (e.currentTarget.dataset.idx == 1){
      wx.setNavigationBarTitle({ title: '待支付批发单' })
      list = []
      page=1
      that.setData({
        LeiXIng:"待支付",
      })
      that.qingqiu(1001, page)
      secondId = 1
    }
    if (e.currentTarget.dataset.idx == 2) {
      wx.setNavigationBarTitle({ title: '待收货批发单' })
      list = []
      page = 1
      that.setData({
        LeiXIng: "待收货",
      })
      that.qingqiu(1002, page)
      secondId = 2
    }
    if (e.currentTarget.dataset.idx == 3) {
      wx.setNavigationBarTitle({ title: '已完成批发单' })
      list = []
      page = 1
      that.setData({
        LeiXIng: "已完成",
      })
      that.qingqiu(1003, page)
      secondId = 3
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
     secondId = options.currentTab; 
     console.log(secondId)
  },
  //确认收货
  theGoods:function(e){
    var that=this

    wx.showModal({
      title: "提示",
      content: "是否确认收货",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          console.log(123)
          var index = e.currentTarget.dataset.index;
          console.log(index)
          var LIST = that.data.List
          console.log(LIST)
          var OrderID = LIST[index].OrderID;

          console.log(OrderID)
          wx.request({
            url: common.config.TheGoods,
            method: "post",
            data: {
              orderId: OrderID
            },
            success: function (res) {
              console.log(res)
              if(res.data){
                common.DoSuccess("已收货", 500)
                LIST[index].StatusCode = 0;
                var num = 0;
                console.log(LIST)
                for (var i = 0; i < LIST.length; i++) {
                  if (LIST[i].StatusCode == 0) {
                    num++
                  }
                }
                if (num == LIST.length) {
                  that.setData({
                    noMoreA: false,
                    List: LIST
                  })
                  console.log(num)
                }else{
                  that.setData({
                    List: LIST
                  })
                  console.log(123)
                }
              } 
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
   
  },
  //查看物流
  Logisticsview:function(e){
    var that=this
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var LIST = that.data.List
    console.log(LIST)
    var OrderID = LIST[index].OrderID;
    console.log(OrderID);
    wx.request({
      url: common.config.Logisticsview,
      method:"post",
      data:{
        orderid: OrderID
      },
      success:function(res){
        console.log(res)
        if (res.data.num==0){
          common.modalTap(res.data.message)
        }else{
          wx.navigateTo({
            url: '../WuLiu/WuLiu?OrderID=' + OrderID,
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  QuZhiFu:function(e){
    var ids = e.currentTarget.dataset.index;
    var list = this.data.List
    var OrderID = list[ids].OrderID
    wx.navigateTo({
      url: "../../Confirmation/Confirmation?types=0&ISshow=0&ISZ=1" + "&OrderID=" + OrderID,
    })
  },
  QuZhiFuZ: function (e) {
    var ids = e.currentTarget.dataset.index;
    var list = this.data.List
    var OrderID = list[ids].OrderID
    wx.navigateTo({
      url: "../../Confirmation/Confirmation?types=0&ISshow=0&ISZ=0" + "&OrderID=" + OrderID,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    if (secondId == 0) {
      list = []
      page = 1
      LeiXIng="",
      that.qingqiu("", page)
    } if (secondId == 1) {
      list = []
      page = 1
      LeiXIng = "待支付",
      that.qingqiu(1001, page)
    }
    if (secondId == 2) {
      list = []
      page = 1
      LeiXIng = "待收货",
      that.qingqiu(1002, page)
    }
      if (secondId == 3) {
      list = []
      page = 1
      LeiXIng = "已完成",
      that.qingqiu(1003, page)
    }
  },
//去看商品
  GOSHangPinX:function(e){
    console.log(e)
    var idx = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var list = this.data.List
    console.log(idx)
    var CommodityId = list[idx].Commlist[id].CommodityId
    var OrderID = list[idx].OrderID
    wx.navigateTo({
      url: '../../commodity/commodity?CommodityId=' + CommodityId + "&OrderID=" + OrderID,
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
    var that = this
   
    if (that.data.currentTab==0){
     
      page++
      that.qingqiu('', page)
      
    }
    if (that.data.currentTab == 1) {
      
      page++
      that.qingqiu(1001, page)
      
    }
    if (that.data.currentTab == 2) {
      
      page++
      that.qingqiu(1002, page)
      
    }
    if (that.data.currentTab == 3) {
      
      page++
      that.qingqiu(1003, page)
      
    }
    
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