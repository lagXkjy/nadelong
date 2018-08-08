// pages/Newindex/index.js
var common = require("../../common.js")
var page = 1;
var list = []
var LIST = []
var brandId = "";
var winetype = "";
var Coutry = "";
var money = "";
var keyword = "";
var ALL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Allurl: common.config.Allurl,
    moreDuo: true,
    hiddenLoading: true,
    swiper: "swiper",
    moreDuo1: true,
    noMore: true,
    noMore1: true,
    specal: false,
    speacla: true,
    imgUrls:[
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    console.log(options.id == undefined)
    let id = wx.getStorageSync('thisFxuser')
    common.GetOpenId()
    // if (!id){
    //   //wx.setStorageSync("thisFxuser", 0)
      
    // }else{
    //   //wx.setStorageSync("thisFxuser", options.id)
    //   common.GetOpenId()
    // }
   
    var that=this
    that.setData({
      hiddenLoading: false,
    })
  },
  JiuZhuang:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  JingXun:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../JingXuan/index?id='+id,
    })
  },
  // 渲染列表
  Content:function(){
    var that=this
    wx.request({
      url: common.config.NewIndex,
      success:function(res){
        console.log(res.data)
        console.log(res.data.video.VideoFile)
        that.setData({
          hiddenLoading: true,
          arry: res.data,
          view : res.data.video.VideoFile,
          imgbg : res.data.video.VideoImg,
          list:res.data.banner
        })
      },
      fail:function(){},
      complete:function(){
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
  Lowding: function () {
    var that = this
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.BenZhou,
      data:{
        page:1,
        pagesize:500
      },
      method:'post',
      success:function(res){
        console.log(common.config.BenZhou,res)
        var LIST=res.data
        for (var i = 0; i < res.data.length; i++) {
          LIST[i].Price = common.changeTwoDecimal_f(LIST[i].Price)
        }
        that.setData({
          listL: LIST
        })
      },
      fail:function(){},
      complete(){
        that.setData({
          hiddenLoading: true,
        })
      }
    })
  },
  LinkTo: function (e) {
    console.log(e)
    
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../commodity/commodity?CommodityId=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.Content()
    this.Lowding()
    var that = this;

    LIST = []
    page = 1
   
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
  },
  // 出现搜索框
  xiaoshi: function () {
    this.setData({
      speacla: true,
      specal: false,
      swiper: "swiper",
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
    page = 1
    LIST = []
    this.TiaoZHuan(this.data.array[e.detail.value], 0, e.detail.value)
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var num = e.detail.value
    winetype = this.data.array1[num]

    this.setData({
      index1: e.detail.value
    })
    page = 1
    LIST = []
    this.TiaoZHuan(this.data.array1[e.detail.value], 1, e.detail.value)
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
    this.TiaoZHuan(this.data.array2[e.detail.value], 2, e.detail.value)
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
    this.TiaoZHuan(this.data.array3[e.detail.value], 3, e.detail.value)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  focus: function () {
    var that = this;
    that.setData({
      specal: true,
      speacla: false,
      swiper: "swiper1",
    })
    console.log(123)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
  TiaoZHuan:function(options,vul,index){
      wx.navigateTo({
        url: '../index/index?Kai=' + 0 + '&value=' + options + '&types=' + vul + '&index=' + index,
      })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  // focus:function(){
 
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  //  清除全部
  clearall: function () {
    this.setData({
      index3: "",
      index: "",
      index1: "",
      index2: "",

    })
    brandId = "";
    winetype = "";
    Coutry = "";
    money = "";
    keyword = ""
    LIST = []
    page 
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