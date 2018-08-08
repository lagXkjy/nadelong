var app = getApp()
var common=require("../../common.js")
var CommodityId;
var listT=[];
var cars;
var allLen;
var Contnet;
var FxUserId=0;
var showMoRen=false;
var userid;
Page({
  data: {
    Allurl: common.config.Allurl,
    interfacedomain: common.config.interfacedomain,
    imgS:'../../images/shouchang_07.png',
    Show:'Show',
    motto: '',
    Snum:1,
    OU:"¥",
    hiddenLoading:true,
    Isho:false,
    Contnet:false,
    
    userInfo: {},
    imgUrls: [
      '../../images/big-demo_02.jpg',
      '../../images/big-demo_02.jpg',
      ]
  },

  //事件处理函数
  bindViewTap: function () {

  },
  //加
  Jia:function(){
    var sum = this.data.Snum
    sum++
    this.setData({
      Snum:sum
    })
  },
  // 减
  Jian:function(){
    var sum = this.data.Snum
    if (sum>1){
      sum--
      this.setData({
        Snum: sum
      })
    }
  },
  onUnload:function () {
    FxUserId = 0
    console.log(FxUserId)
    console.log(123)
  },
  onLoad: function (options) {
    userid = wx.getStorageSync('userid')
    console.log(userid)
    this.setData({
      userid:userid,
      hiddenLoading: false,
    })
    var thisccid=options.ccid;
    //thisccid=252; //测试
    console.log('onLoad')
    CommodityId = options.CommodityId;
    //分销客分销商品 
    FxUserId = 0; 
    if(thisccid!=0 && thisccid!='undefined' && thisccid!=null){
      FxUserId=thisccid;
    }
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.request({

      url: common.config.Commoditydetails,
      data:{
        CommodityId: CommodityId,
        userid: wx.getStorageSync("userid")
      },
      success:function(res){
        console.log(res)
        if (res.data.comment.length>1){
          var a;
          var listT = [];
          for (var i = 1; i < res.data.comment.length; i++) {
            var b = [];
            var c = [];
            var a = res.data.comment[i].Photes;
            b = a.split(",");
            for (var j = 0; j < b.length; j++) {
              c.push(b[j])
            }
            res.data.comment[i].Photes = c
            listT.push(res.data.comment[i])
            console.log(listT)
          }
          var nb = [];
          var nc = [];
          var listP = [];
          var na = res.data.comment[0].Photes;
          nb = na.split(",");
          for (var b = 0; b < nb.length; b++) {
            nc.push(nb[b])
          }
          res.data.comment[0].Photes = nc
          listP.push(res.data.comment[0])
          allLen = res.data.comment.length-1
          Contnet=false;
          showMoRen = false;
          for (var i = 0; i < listT.length; i++) {
            listT[i].index = i
            console.log(listT)
          }
        } else if (res.data.comment.length==0){
          listP=""
          listT= ""
          allLen=0;
          Contnet=true;
        } else if (res.data.comment.length==1){

          var nb = [];
          var nc = [];
          var listP = [];
          var na = res.data.comment[0].Photes;
          nb = na.split(",");
          for (var b = 0; b < nb.length; b++) {
            nc.push(nb[b])
          }
          res.data.comment[0].Photes = nc
          listP.push(res.data.comment[0])
          allLen = res.data.comment.length - 1
          Contnet = false;
          showMoRen=true;
        }
        console.log(listP)
        console.log(listT)

        cars = res.data.cars;
        that.setData({
          hiddenLoading: true,
          AllList: res.data.model,
          Price: common.changeTwoDecimal_f(res.data.model.Price),
          HighPraise: common.changeTwoDecimal_f(res.data.model.HighPraise),
          imgUrls: JSON.parse(res.data.Imgs),
          listP: listP,
          listT: listT,
          CheckFile: res.data.model.CheckFile,
          CustomsFile: res.data.model.CustomsFile ,
          billsFile: res.data.model.billsFile,
          Idea: res.data.model.SendIdea,
          allLen: allLen,
          IsCollect: res.data.IsCollect,
          cars: cars,
          Contnet: Contnet,
          showMoRen: showMoRen
        })
        console.log(that.data.AllList)
      },
      fail:function(res){
        that.setData({
          hiddenLoading: true,
        })
        common.modalTap("错误")
      },
      complete:function(res){
        that.setData({
          hiddenLoading: true,
        })
      }
    })
  },
  YuLan:function(){
    var current = this.data.Allurl + this.data.Idea
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current]
    })
  },
  YuLan1: function () {
    var current = this.data.Allurl + this.data.billsFile
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current]
    })
  },
  YuLan2: function () {
    var current = this.data.Allurl + this.data.CustomsFile
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current]
    })
  },
  YuLan3: function () {
    var current = this.data.Allurl + this.data.CheckFile
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current]
    })
  },
  //预览图片
  ShowImage:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var current = this.data.interfacedomain+this.data.listP[0].Photes[id];
    console.log(current)
    var urls=[];
    for (var i = 0; i < this.data.listP[0].Photes.length;i++){
      var aa = this.data.interfacedomain +this.data.listP[0].Photes[i]
      urls.push(aa)
    }
    console.log(urls)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  //预览图片2
  ShowImage2: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index
    var current = this.data.interfacedomain + this.data.listT[index].Photes[id];
    console.log(current)
    var urls = [];
    for (var i = 0; i < this.data.listT[index].Photes.length; i++) {
      var aa = this.data.interfacedomain + this.data.listT[index].Photes[i]
      urls.push(aa)
    }
    console.log(urls)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  shopping:function(){
    var that=this
    wx.navigateTo({
      url: '../Confirmation/Confirmation?userid=' + wx.getStorageSync("userid") + '&CommodityId=' + CommodityId + '&ISshow=0&types=0&ccid=' + FxUserId + '&sum=' + that.data.Snum,
    })
  },
  ISshow:function(){
    if(this.data.Show=="Show"){
      this.setData({
        Show:'',
        Isho:true
      })
    }else{
      this.setData({
        Show: 'Show',
        Isho: false
      })
    }
    console.log(this.data.Isho)
  },
  //购物车
  GoCars:function() { 
    wx.setStorageSync('page', 1);
   wx.switchTab({
      url: '../Introduction/shopping/shopping',
    })
    console.log(123)
  },
  //返回首页
  IndexYe:function(){
    wx.switchTab({
      url: '../Newindex/index'
    })
  },

  //收藏
  IsShou:function(){
    var that=this
    that.setData({
      hiddenLoading: false,
    })
    console.log(this.data.IsCollect)
    if (!that.data.IsCollect){
      wx.request({
        url: common.config.Collection,
        method:'post',
        data:{
          userId: wx.getStorageSync("userid"),
          CommodityID: CommodityId,
        },
        success:function(res){
          console.log(res)
          if (res.data.result){
            common.DoSuccess(res.data.msg, 1000)
            that.setData({
              hiddenLoading: true,
              IsCollect: !that.data.IsCollect,
            })
          }else{
            that.setData({
              hiddenLoading: true,
            })
            common.modalTap("网络错误")
          }
        }
      })
    }else{
     
      wx.request({
        url: common.config.Collection,
        method: 'post',
        data: {
          userId: wx.getStorageSync("userid"),
          CommodityID: CommodityId,
        },
        success: function (res) {
          if (res.data.result){
            console.log(res)
            common.DoSuccess(res.data.msg, 1000)
            that.setData({
              hiddenLoading: true,
              IsCollect: !that.data.IsCollect,
            })
          }else{
            that.setData({
              hiddenLoading: true,
            })
            common.modalTap("网络错误")
          }
        }
      })
    }
    //接口
  },
 
  //加入购物车
  addCart:function(){
    var that=this
    that.setData({
      hiddenLoading: false,
    })
    wx.request({
      url: common.config.AddCart,
      method:'get',
      data:{
        userid: wx.getStorageSync("userid"),
        commodityid: CommodityId,
        commoditynum: that.data.Snum,
        FxUserId: FxUserId
      },
      success:function(res){
        console.log(res)
        cars++
        if (res.data.Status){
          common.DoSuccess("添加成功", 1000)
          that.setData({
            hiddenLoading: true,
            cars:cars
          })
        }else{
          that.setData({
            hiddenLoading: true,
          })
          common.DoSuccess("添加失败", 1000)
        }
      }
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
  // 分享
  /*
  onShareAppMessage: function (res) {
    var that=this
    if (res.from === 'button') {

      common.modalTap(userid)
      // 来自页面内转发按钮
      console.log(res.target+"1223")

    }
    return {
      title: this.data.AllList.CommodityTitle + this.data.AllList.BrandName,
      path: '/pages/commodity/commodity?ccid=' + that.data.userid + '&CommodityId=' + CommodityId,
      success: function (res) {
        console.log(that.data.userid)
        console.log(CommodityId)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  */
})