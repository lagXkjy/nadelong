const util = require('./utils/util.js')
var host = "redj.1-zhao.com"
var config = {

  //下面的地址配合云端 Server 工作
  host,
//接口域名
  interfacedomain: 'https://redj.1-zhao.com',//`https://wx9s.1-zhao.com`,
  //红酒文化
  Wineculture: `https://${host}/api/Chateau/TBActivity`,
  //国家
  Contray: `https://${host}/api/Chateau/CheckCondition`,
  //搜索
  Search: `https://${host}/api/Commodity/List`,
  //图片路径
  Allurl:"http://redj.1-zhao.com",
  //搜索
  Chateauinformation: `https://${host}/api/Commodity/ShateauDetail`,
  //酒庄轮播图
  Chateaufigure: `https://${host}/api/Chateau/TBChateauBanner`,
  //获取openid
  GetOrSetOpenid: `https://${host}/api/WeixinGet/GetSaveOpenId`,
  //全部订单
  orders: `https://${host}/api/Commodity/OrderList1`,
  //酒庄酒品
  Wines: `https://${host}/api/Commodity/ShopList`,
  //酒庄活动
  Chateauactivities: `https://${host}/api/Chateau/ActivityDetail`,
  //获取评价详情
  evaluationdetails: `https://${host}/api/Commodity/OrederShop`,
  //图片上传
  LoadPhone: `https://${host}/api/Commodity/SaveAPPImage`,
  //商品详细
  Commoditydetails: `https://${host}/api/Commodity/OneShop`,
  //评论提交接口
  Commentsubmitinterface: `https://${host}/api/Commodity/SendApprise`,
  //取消收藏
  Cancelthecollection: `https://${host}/api/UserSelf/ConcelConllect`,
  //收藏
  Collection: `https://${host}/api/UserSelf/ColllectCom`,
  //订单详细 购物车
  Theorderdetails: `https://${host}/api/Order/GetConfirmOrderInfoByShopCar`,
  //购物车
  Shoppingcart: `https://${host}/api/ShopCar/Cars`,
  //添加到购物车
  AddCart: `https://${host}/Api/ShopCar/AddCommodityInShopCar`,
  //首页轮播图接口
  Shufflingfigure: `https://${host}/api/Chateau/BannerUpload`,
  //确认收货
  TheGoods: `https://${host}/api/Commodity/ReciptGoods`,
  //查看物流
  Logisticsview: `https://${host}/api/Commodity/WuLiuInfo`,
  //我的团队
  Team: `https://${host}/api/Team/Team`,
  //我的营业额
  yye: `https://${host}/api/yye/yye`,
  //
  yyeDetail: `https://${host}/api/yye/Detail`,
  //团队收益详情
  TeamDetail: `https://${host}/api/Team/Detail`,
  //我的收藏查询
  MyCollection: `https://${host}/api/Chateau/TBConllection`,
  //取消收藏
  CancelCollect: `https://${host}/api/UserSelf/ConcelConllect`,
  //我的收获地址
  MyAddress: `https://${host}/api/Chateau/TBUserAddress`,
  //设置默认地址
  SetDefaultAddress: `https://${host}/api/UserSelf/SetDefaultAddress`,
  //删除收获地址
  DeleteAddress: `https://${host}/api/UserSelf/DeleteAddress`,
  //添加新收获地址
  NewAddress: `https://${host}/api/UserSelf/newAddress`,
  //获取地址（单个）
  getAddress: `https://${host}/api/UserSelf/Address`,
  //修改地址
  UpAddress: `https://${host}/api/UserSelf/UpAddress`,
  //单选
  selectone: `https://${host}/api/Order/ChoseCar`,
  //加减
  Addandsubtract: `https://${host}/api/ShopCar/AdjustmentShopCarSum`,
  //单独订单
  DanDuDingDa: `https://${host}/api/Order/GetConfirmOrderInfoByOne`,
  //单订单确认详情
  OrderConfirmation: `https://${host}/api/Order/SubmitOrderInfoByOne`,
  //购物车订单确认详情
   ShoppingCSrt: `https://${host}/api/Order/SubmitOrderInfoByCart`,
   //订单详情all
   details: `https://${host}/api/Order/GetOrderDetailInfo`,
   //清除商品
   ClearShop:`https://${host}/api/ShopCar/ClearShop`,
   //修改订单状态
   ChangeOrder: `https://${host}/api/Commodity/PayOrder`,

   getUsertype: `https://${host}/api/UserSelf/getUsertype`,
   //付款接口
   payMoney: `https://${host}/api/PayMomment/Pay`,
   //再次购买
   buyAgain: `https://${host}/api/Order/GetConfirmOrderInfoByBuyAgain`,
   //再次购买提交
   ShoppingAgain: `https://${host}/api/Order/SubmitOrderInfoByAgain`,
  // 新首页
   NewIndex: `https://${host}/api/Series/Series`,
   //精品列表
   JinPinLieBiao:`https://${host}/api/Series/SeriesList`,
   //系列详情
   XieLieXiangQing:`https://${host}/api/Series/SeriesDetail`,
   //系列详情酒
   XieLieXiangQingJiu: `https://${host}/api/Series/commodityList`,
   //获得 分销图片
   getFxPhoto: `https://${host}/api/QrCode/SaveInitQrCode`,
  //  本周热卖
   BenZhou: `https://${host}/api/Home/GetWines`,
  //  购物车收藏
   SHouCangNew: `https://${host}/api/Home/ColllectCar`,
   //登录
  Login: `https://${host}/api/WeixinGet/GetIfUser`,
};

function loading(data, msg) {
  wx.showToast({
    title: msg,
    icon: "loading",
    duration: data
  })
}
function changeTwoDecimal_f(x) {
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
}

function DoSuccess(data,msg) {
  wx.showToast({
    title: data,
    icon: "success",
    duration: msg
  })
}

function modalTap(data) {
  wx.showModal({
    title: "提示信息",
    content: data,
    showCancel: false,
    confirmText: "确定"
  })
}
function setStorage(key, data) {
  wx.setStorage({
    key: key,
    data: data
  })
}
function getStorage(key, cb) {
  wx.getStorage({
    key: key,
    success: function (res) {
      typeof cb == "function" && cb(res)
    }
  })
}
function setStorageSync(key, data) {
  wx.setStorageSync(key, data)
}
function IsOpenId() {
  var userid = wx.getStorageSync("userid");
  var openid = wx.getStorageSync("openid");
  var thisFxuser= wx.getStorageSync('thisFxuser');
  if (userid == "" || userid == null || openid == "" || openid == null || (thisFxuser != null && thisFxuser != undefined && thisFxuser!=0)) {
   GetOpenId();
  }
}


function GetOpenId() {
  wx.login({
    complete:(res)=>{
      console.log('wx.login:',res)
      if(res.code){
        let code = res.code
        let avatarUrl = wx.getStorageSync('avatarUrl')
        let nickName = wx.getStorageSync('nickName')
        let gender = wx.getStorageSync('gender')
        let fxuserId = wx.getStorageSync('thisFxuser')
        util.$http(
          config.GetOrSetOpenid,
          "POST",
          {
            UserCode: code,
            NickName: nickName,
            headImgurl: avatarUrl,
            Gender: gender,
            fxuserId,
          },
        ).then(res=>{
          wx.setStorageSync('userid', res.data.ReUser);//userid
          wx.setStorageSync("openid", res.data.openid);//openid
        })
      }
    }
  })
  /*
  wx.login({
    success: function (res) {
      console.log(res)
      if (res.code) {
        //获取code
        wx.setStorageSync('Code', res.code);
        var userid = wx.getStorageSync('userid');
        if (userid == null || userid == "") {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              var s = JSON.parse(res.rawData);
              var nickName = s.nickName;//昵称
              var avatarUrl = s.avatarUrl;//头像
              var gender = s.gender
              wx.setStorageSync("nickName", s.nickName);//昵称
              wx.setStorageSync("avatarUrl", s.avatarUrl);//头像
              
              wx.request({
                url: config.GetOrSetOpenid,
                data: {
                  UserCode: wx.getStorageSync('Code'),
                  NickName: nickName,
                  headImgurl: avatarUrl,
                  Gender: gender,
                  fxuserId: wx.getStorageSync('thisFxuser')
                },
                header: {
                  'content-type': 'application/json'
                },
                method: 'post',
                success: function (res) {
                  console.log(res)
                  if (res.data.result) {
                    wx.setStorageSync('userid', res.data.ReUser);//userid
                    wx.setStorageSync("openid", res.data.openid);//openid
                  }
                }
              })
            }
          })
        } else {
          console.log('！' + res.errMsg)
        }
      }
    },
    fail: function (res) { //用户无授权时
      that.setData({
        getUserInfoFail: true
      })
    }
  });
  */
}

function uploadimg(data) {
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
      //这里可能有BUG，失败也会执行这里
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
        that.uploadimg(data);
      }

    }
  });
}
function Getnameandhead() {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.getUserInfo({
          success: function (res) {
            var s = JSON.parse(res.rawData);
            wx.setStorageSync("nickName", s.nickName);//昵称
            wx.setStorageSync("avatarUrl", s.avatarUrl);//头像
          }
        })
      }
    }
  });
}
module.exports.config = config
exports.setStorage = setStorage
exports.getStorage = getStorage
exports.setStorageSync = setStorageSync
exports.loading = loading
exports.DoSuccess = DoSuccess
exports.modalTap = modalTap
exports.IsOpenId = IsOpenId
exports.GetOpenId = GetOpenId
exports.uploadimg = uploadimg
exports.changeTwoDecimal_f = changeTwoDecimal_f

