// Collection.js
var common=require('../../../common.js')
var userid = wx.getStorageSync('userid');
var All;
var list=[]
var page=1;
var startY;
var startX;
var key;
var startright;
var maxRight=240;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    right:0,
    noMore:true,
    isshow:false,
    hiddenLoading:true,
    selectedAllStatus: true,
    xuanall: "全选",
    tale:"0",
    Allurl:common.config.Allurl,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],

  },
  //计算规则
  rule: function () { 
    wx.navigateTo({
      url: '../../rule/rule',
    })
  },
    drawStart: function (e) {
    var dix = e.currentTarget.dataset.index;
    console.log("drawStart");
    var touch = e.touches[0];
    console.log(touch);  
    startX = touch.clientX;
    startY = touch.clientY;
    var cardTeams = this.data.list;
    var data = cardTeams[dix];
      data.startright = data.right;
    key = true;
  },
  drawEnd: function (e) {
    var dix = e.currentTarget.dataset.index;
    console.log("drawEnd");
    var cardTeams = this.data.list;

    var data = cardTeams[dix];
      if (data.right <= 120/ 2) {
        data.right = 0;
        console.log(12)
      } else {
        data.right = maxRight;
        console.log(maxRight)
      }

    this.setData({
      list: cardTeams
    });
  },

  drawMove: function (e) {
    var dix = e.currentTarget.dataset.index;
    console.log("drawMove");  
    var self = this;
    var dataId = e.currentTarget.index;
    var cardTeams = this.data.list;
    if (key) {
      var touch = e.touches[0];
      var endX = touch.clientX;
      var endY = touch.clientY;
      console.log("startX=" + startX + " endX=" + endX);
      if (endX - startX == 0)
        return;
      var res = cardTeams;
      //从右往左  

      if ((endX - startX) < 0) {
        console.log(123)
        var data = res[dix];

        var startright = res[dix].startright;
            var change = startX - endX;
            startright += change;
            if (startright > maxRight)
              startright = maxRight;
            res[dix].right = startright;
          }else {//从左往右  

          var data = res[dix];
            var startright = res[dix].startright;
            var change = endX - startX;
            startright -= change;
            console.log()
            if (startright < 0)
              startright = 0;
            res[dix].right = startright;
          }
      self.setData({
        list: cardTeams
      });
  }},  
// 
// 汇总
SUMAll:function(){
  var that=this
  var ZongJi=0
  var SUM=0
  var list = that.data.list
  for(var i=0;i<list.length;i++){
    if (list[i].show==false){
      ZongJi += Number(list[i].Sum)
      SUM++
    }
    if (SUM == list.length){
      console.log()
      that.setData({
        selectedAllStatus: false
      })
    }
  }
  ZongJi=that.changeTwoDecimal_f(ZongJi)
  console.log(that.changeTwoDecimal_f(ZongJi))
  that.setData({
    ZongJi: ZongJi
  })
},
changeTwoDecimal_f:function(x) {
    var f_x = parseFloat(x);
    if(isNaN(f_x)) {
      alert('function:changeTwoDecimal->parameter error');
      return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if(pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0';
    }
    return s_x;
  },
 //绑定文本框数量
  bindMinus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.list[index].Quantity;
    var carid = this.data.list[index].CartID;
    var that=this
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      var pp=num-1
      wx.request({
        url: common.config.Addandsubtract,
        method: 'post',
        data: {
          carid: carid,
          num: pp,
        },
        success: function (res) {
          common.loading(500, "加载中")
         if(res.data.Status){
           num--

           // 只有大于一件的时候，才能normal状态，否则disable状态
           var minusStatus = num <= 1 ? 'disabled' : 'normal';
           // 购物车数据
           var carts = that.data.list;
           carts[index].Quantity = num;
           // 按钮可用状态
           var minusStatuses = that.data.minusStatuses;
           minusStatuses[index] = minusStatus;
           var all = that.data.list[index].Price;
           var allp = Number(all * num)
           var newNum = (Math.round(allp * 100) / 100).toFixed(2)
           carts[index].Sum = newNum;
           // 将数值与状态写回
           that.setData({
             list: carts,
             minusStatuses: minusStatuses
           });
           that.sum()
         }else{
           common.modalTap("网络错误")
         }
        },
        fail: function (res) {
          common.modalTap("网络错误")
        }
      })
    }

  },

  bindPlus: function (e) {
    var that = this
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.list[index].Quantity;
    var carid = this.data.list[index].CartID
    // 自增
    var pp = num+1
    wx.request({
      url: common.config.Addandsubtract,
      method: 'post',
      data: {
        carid: carid,
        num: pp,
      },
      success: function (res) {
       
        common.loading(500, "加载中")
        if (res.data.Status) {
          num+=1
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.list;
          carts[index].Quantity = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          var all = that.data.list[index].Price;
          var allp = Number(all * num)
          var newNum = (Math.round(allp * 100) / 100).toFixed(2)
          carts[index].Sum = newNum
          // 将数值与状态写回
          that.setData({
            list: carts,
            minusStatuses: minusStatuses
          });
          that.sum()
        } else {
          common.modalTap("网络错误")
        }
      },
      fail:function(res){
        common.modalTap("网络错误")
      }
    })

  },
  //删除购物车商品
  delItem:function(e){
    var that=this

    var idx = e.currentTarget.dataset.index;
    var list=this.data.list
    wx.showModal({
      title: "提示",
      content: "删除此商品？",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        that.setData({
          hiddenLoading: false,
        })
        if (res.confirm) {
          wx.request({
            url: common.config.ClearShop,
            method: "post",
            data: {
              CartID: that.data.list[idx].CartID
            },
            success: function (res) {
              console.log(res)
              that.setData({
                hiddenLoading: true,
              })
              that.onShow()
              // if (res.data.Code) {
              //   list[idx].IsShow = false
              //   that.setData({
              //     list: list
              //   })
               
              // }
            },
            fail: function (res) {
              that.setData({
                hiddenLoading: true,
              })
              common.modalTap(res.data)
            },

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          that.setData({
            hiddenLoading: true,
          })
        }
        console.log(123)
    
      }
    })
  },
  bindCheckbox: function (e) {
    var arry=[];
    var idx = e.currentTarget.dataset.index;
    var list = this.data.list;
    var show = list[idx].show;
    list[idx].show = !show;
    // 是否全选
    for (var i = 0; i < list.length;i++){
      if (list[i].show){
        var pp;
        arry.push(1)
      }else{
        arry.splice(1)
      }
      if (arry.length>0){
         pp = false
      }else{
        pp=true
      }
    }
    if (show){
      wx.request({
        url: common.config.selectone,
        method: 'post',
        data:{
          CommodityId: list[idx].CommodityId,
          
          state:0,
          userId: wx.getStorageSync("userid")
        },
        success:function(res){
          console.log(res)
        },
      })
    }else{
      wx.request({
        url: common.config.selectone,
        method: 'post',
        data: {
          CommodityId: list[idx].CommodityId,
          state: 1,
          userId: wx.getStorageSync("userid")
        },
        success: function (res) {
          console.log(res)
        },
      })
    }
    console.log(arry.length)
    this.setData({
      list: list,
      selectedAllStatus:!pp
    })
    this.SUMAll
    this.sum()
  },
  bindSelectAll: function (e) {
    var that=this
    var selectedAllStatus = that.data.selectedAllStatus;

    var list = that.data.list;

    selectedAllStatus = !selectedAllStatus;
    wx.request({
      url: common.config.selectone,
      method: 'post',
      data:{
        isQuanxuan: !selectedAllStatus,
        userId: wx.getStorageSync("userid")
      },
      success:function(res){
        console.log(res)
        for (var i = 0; i < list.length; i++) {

          list[i].show = selectedAllStatus;

        }

        that.setData({

          list: list,

          selectedAllStatus: selectedAllStatus

        });
        that.sum()
      }
    })
    
  },
  //看详情
  GoXiangQi:function(e){
    var idx = e.currentTarget.dataset.index;
    var CommodityId = this.data.list[idx].CommodityId
    console.log(idx)
    console.log(CommodityId)
    wx.navigateTo({
      url: '../../commodity/commodity?CommodityId=' + CommodityId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    All=options

  },

//渲染购物车
  ShowCart:function(){
    var that=this
    that.setData({
      hiddenLoading: false,
    })
    console.log(page)
    wx.request({
      url: common.config.Shoppingcart,
      data: {
        UserId: wx.getStorageSync("userid"),
        page: page,
        pageSize: 10,
      },
      success: function (res) {
        console.log(res)
        var JON = JSON.parse(res.data)
        console.log(JON)
        var All = page*10;
        if (JON.length > 0 && JON.length < All){
          for(var i=0;i<JON.length;i++){
            JON[i].HighPraise = common.changeTwoDecimal_f(JON[i].HighPraise)
          }
          that.setData({
            hiddenLoading: true,
            list: JON,
            isshow: false,
            noMore: false,
          })
          that.sum()
          this.SUMAll
        } else if (JON.length==0){
          that.setData({
            hiddenLoading: true,
              isshow: true,
              isshow: true,
            })
        }
          
        // if (JON.length > 0) {
        //   for (var i = 0; i < JON.length; i++) {
        //     list.push(JON[i])
        //   }
        //   that.setData({
        //     list: list,
        //     isshow: false
        //   })
        //   that.sum()
        //   console.log(JON.length)
        // } else if (JON.length==0){
        //   console.log(JON.length)

        //   that.setData({
        //     noMore: false,
        //     isshow: false
        //   })
        //   if (JON.length == 0 && page == 1) {
        //     that.setData({
        //       isshow: true,

        //     })
        //     }
        // } 
      },
      fail: function (res) {
        that.setData({
          hiddenLoading: true,
        })
        common.modalTap("网络错误")
      }
    })
  },

  //  汇总 
  sum: function () {
    var carts = this.data.list;
    this.SUMAll()
    console.log(carts)
    var zong = 0;
    for (var i = 0; i < carts.length; i++) {
      if (!carts[i].show) {
        zong += carts[i].Quantity
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      list: carts,
      tale: zong
    });
  },
  lianjie: function () {
    var LIST = this.data.list;
    var allLi=[]
    for (var i = 0; i < LIST.length;i++){
      if (!LIST[i].show){
        allLi.push(LIST[i].CartID)
      }
    }
    if (this.data.tale==0){
      common.modalTap("至少选择一件商品")
    }else{
      wx.navigateTo({
        url: '../../Confirmation/Confirmation?allLi=' + allLi + '&types=1',
      })
    }
   
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
   
    console.log(All.page)
      page=1
      list=[]
      this.ShowCart()
      console.log(All.page)
      wx.setStorageSync('page', 0);
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
    page++
    this.ShowCart()
  },
  SHouCang:function(e){
    var that=this
    that.setData({
      hiddenLoading:false
    })
    var idx = e.currentTarget.dataset.index;
    var list = this.data.list
    wx.request({
      url: common.config.SHouCangNew,
      method:'post',
      data:{
        userId: wx.getStorageSync('userid'),
        CommodityID: list[idx].CommodityId
      },
      success:function(res){
        console.log(res)
        if (res.data.result){
          if (res.data.msg=='已收藏'){
            common.DoSuccess('您已收藏过该商品',1000)
          }else{
            common.DoSuccess('收藏成功',1000)
          }
        }
      },
      fail:function(){
        common.modalTap('收藏失败')
      },
      complete:function(){
        that.setData({
          hiddenLoading: true
        })
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
})