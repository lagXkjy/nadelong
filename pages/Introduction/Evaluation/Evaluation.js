var app = getApp()
var common=require("../../../common.js")
var list = []
var CommodityId
var OrderID;
var LIST=[]
var all;
Page({
  data: {
    Allurl: common.config.Allurl,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../../images/selected.png',
    selectedSrc: '../../../images/normal.png',
    halfSrc: '../../../images/normal_03.png',
    key: 0,//评分
    list:[],
    name:"textarea"
  
  },
  onLoad: function (options) {
     all = options
     var that = this
     CommodityId = all.CommodityId
     OrderID = all.OrderID
     wx.request({
       url: common.config.evaluationdetails,
       data: {
         OrderId: OrderID
       },
       success: function (res) {
         console.log(res.data)
         var pp = res.data.Code;
         for(var i=0;i<pp.length;i++){
           pp[i].index=i
         }
         that.setData({
           List: pp,
         })
       }
     })
  },
onShow:function(){
 
},
  uploadimg :function (data,id) {
    var list=this.data.List
    console.log(i = data.i ? data.i : 0)
    console.log(success)
    var that = this,
    i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'fileData',
      formData: null,
      success: (resp) => {
        success++;
        console.log(resp)
        console.log(i);
        console.log(id + "55")
        console.log(JSON.parse(resp.data).imgs)
        list[id].LIST.push(JSON.parse(resp.data).imgs)
      
        console.log(list[id].LIST)
        console.log(list)
        //这里可能有BUG，失败也会执行这里
        that.setData({
          List: list
        })
      },
      fail: (res) => {
        fail++;
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;
        if (i == data.path.length) {  //当图片传完时，停止调用     
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data,id);
        }

      }
    });
    
  },
  //点击左边,整颗星
  selectRight: function (e) {
    console.log(e)
    var list=this.data.List;
    var key = e.currentTarget.dataset.key
    var id = e.currentTarget.dataset.id
    list[id].key = key
    // if (list[id].key == 1) {
    //   //只有一颗星的时候,再次点击,变为0颗
    //   key = 0;
    // }
    console.log("得" + key + "分")
    this.setData({
      List: list
    })
  },
  

  Upimg: function (id) {//这里触发图片上传的方法
  var that=this
    var pics = this.data.pics;
   that.uploadimg({
      url: common.config.LoadPhone,//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    },id);
  },

  chooseimg: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    var list=this.data.List
    console.log(id)
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          list[id].list.push({ ImgPath: res.tempFilePaths[i] })
        }
        console.log(list[id].list)
        console.log(list)
        var tempFilePaths = res.tempFilePaths
        that.setData({
          pics: tempFilePaths,
          List:list
        });
        that.Upimg(id)
        // 触发上传函数
      }
    })
  },

//表单内容
  BiaoDan:function(e){
    var id = e.currentTarget.dataset.index;
    var content = e.detail.value;
    var list=this.data.List;
    list[id].content = content;
    console.log(e.detail.value)
    this.setData({
      List:list
    })
    console.log(list)
  },
//提交表单
   formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    
    var that=this
    // 循环
      for(var i=0;i<this.data.List.length;i++){
        console.log(e)
        var content =that.data.List[i].content
        console.log(content)
        if (content==""){
          common.modalTap("说点什么吧")
        } else{
          wx.request({
            url: common.config.Commentsubmitinterface,
            method: 'post',
            data: {
              Content: content,
              filename: that.data.List[i].LIST.join(","),
              UserId: wx.getStorageSync("userid"),
              Score: that.data.List[i].key,
              CommodityId: that.data.List[i].CommodityId,
              OrderID: OrderID
            },
            success: function (res) {
              console.log(res)
              common.DoSuccess(res.data.msg, 1000)
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            },
            fail: function (res) {
              common.modalTap("网络错误")
            },
          })
        }
      }
  },
  onHide:function(){
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