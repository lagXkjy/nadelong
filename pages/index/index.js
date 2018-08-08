//index.js
//获取应用实例
var common=require("../../common.js")
var app = getApp()
var brandId="";
var winetype="";
var Coutry="";
var money="";
var keyword="";
var LIST=[];
var page=1;
Page({
  data: {
    noMore: true,
    show: true,
    OU:"€",
    hiddenLoading:true,
    US:"$",
    swiper: "swiper",
    imgUrls: [
     '../../images/Lafite_02.jpg',
      '../../images/Lafite_02.jpg',
    ],
    allurl: common.config.Allurl,
    specal:false,
    speacla:true,

    list:[
      ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    white:"#fff",
 
  },
  //事件处理函数

  //搜索
  search:function(){
    var that=this;
    if (brandId=="全部"){
      brandId=""
    }
    if (winetype == "全部") {
      winetype = ""
    }
    if (Coutry == "全部") {
      Coutry = ""
    }
    if (money == "全部") {
      money = ""
    }
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.Search,
      data:{
        brandId: brandId,
        winetype: winetype,
        Coutry: Coutry,
        money: money,
        page:page,
        keyword: keyword
      },
      success:function(res){
        if (res.data.length<1&&page==1){
          that.setData({
            hiddenLoading: true,
            list: res.data,
            show: false,
            noMore: true
          })
          console.log(res.data.length)
        } else if (res.data.length == 0){
          that.setData({
            hiddenLoading: true,
            noMore:false
          })
        }else{
        var list = res.data
        console.log(list)
        for(var i=0;i<list.length;i++){
          list[i].Price = list[i].Price.toFixed(2)
          list[i].HighPraise = common.changeTwoDecimal_f(list[i].HighPraise)
          LIST.push(list[i])
        }
        that.setData({
          hiddenLoading: true,
          list: LIST,
          show:true
        })
      }
      },
      fail:function(res){
        that.setData({
          hiddenLoading: true,
        })
        common.modalTap("网络错误")
      }
    })
  },
  // 选择确定
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num = e.detail.value
    Coutry = this.data.array[num]
    console.log(Coutry)
    this.setData({
      index: e.detail.value
    })
    page=1
    LIST = []
    this.search()
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num= e.detail.value
    winetype = this.data.array1[num]
    
    this.setData({
      index1: e.detail.value
    })
    page = 1
    LIST = []
    this.search()
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num = e.detail.value
    money = this.data.array2[num]
    this.setData({
      index2: e.detail.value
    })
    page = 1
    LIST = []
    this.search()
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num = e.detail.value
    brandId = this.data.array3[num]
    this.setData({
      index3: e.detail.value
    })
    page = 1
    LIST = []
    this.search()
  },

  Jump:function(e){
    var id = e.currentTarget.dataset.index;
    var that=this
    wx.navigateTo({
      url: "../Winery/Winery?id=" + id,
    })
  },
  JumpShop: function (e) {
    var CommodityId = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../commodity/commodity?CommodityId=' + CommodityId,
    })
  },
  onLoad: function (options) {
    var that=this
    if (options.Kai==0){
      if (options.types==0){
        Coutry = options.value
        that.search()
        
        that.setData({
          index: options.index
        })
      }
      if (options.types == 1) {
        winetype = options.value
        that.search()
        that.setData({
          index1: options.index
        })
      }
      if (options.types == 2) {
        money = options.value
        that.search()
        that.setData({
          index2: options.index
        })
      }
      if (options.types == 3) {
        keyword = options.value
        that.search()
        that.setData({
          index3: options.index
        })
      }
    }
  },
  onShow:function(){
   
    var that = this;
    
    LIST = []
    page=1
    that.search()
    wx.request({
      url: common.config.Contray,
      success: function (res) {
        console.log(res.data)
        that.setData({
          array: JSON.parse(res.data.Country),
          array1: JSON.parse(res.data.Category),
          array3: JSON.parse(res.data.Brand),
          array2: JSON.parse(res.data.Price),
        })
      }
    })
    wx.request({
      url: common.config.Shufflingfigure,
      success: function (res) {
        console.log(res.data)
        that.setData({
          imgUrls: JSON.parse(res.data)
        })
      }
    })
  },
  focus: function () {
    var that=this;
        that.setData({
          specal: true,
          speacla: false,
          swiper: "swiper1",
        })
        console.log(123)
  },
  //  清除全部
  clearall:function(){
    this.setData({
      index3:"",
      index: "",
      index1: "",
      index2: "",
      
    })
    brandId = "";
    winetype = "";
    Coutry = "";
    money = "";
    keyword = ""
    LIST=[]
    page=1
    this.search()
  },
  // 出现搜索框
  xiaoshi: function () {
    this.setData({
      speacla: true,
      specal: false,
      swiper: "swiper",
    })
  },
  onReachBottom: function () {
   
    page++
    this.search()
  },
  //输入框内容
  KonNei:function(e){
    keyword = e.detail.value
  },
  //模糊搜索
  SearchMoHu:function(){
    page = 1
    LIST = []
    this.search()
  },
//清除
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
