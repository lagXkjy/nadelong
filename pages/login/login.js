// pages/login/login.js
const common = require('../../common.js')
const config = common.config
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  inpAccount(e){
    let account = e.detail.value
    this.setData({account})
  },
  inpPwd(e){
    let pwd = e.detail.value
    this.setData({ pwd })
  },
  getUserInfo(e){
    let account = this.data.account
    let pwd = this.data.pwd
    let userInfo = e.detail.userInfo
    if(!account){
      util.showModal('提示','请输入分销商账号')
      return
    }
    if (!pwd) {
      util.showModal('提示', '请输入密码')
      return
    }
    if(!userInfo){return}
    wx.setStorageSync('gender', userInfo.gender)
    wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
    wx.setStorageSync('nickName', userInfo.nickName)
    console.log(userInfo)
    wx.showLoading('努力加载ing...')
    util.$request(
      config.Login,
      "POST",
      {
        Account: account,
        password: pwd,
      },
      (res)=>{
        console.log("SUCCESS_1", res)
        if (res.data.Status) {
          console.log(11111)
          wx.switchTab({
            url: '../Newindex/index',
          })
        } else {
          if (res.statusCode == 200) {
            util.showModal('提示', `${res.data.Results}`)
          }else{
            util.showModal('提示', `${res.data.statusCode},${res.data.Results}`)
          }
        }
      },
      (err) => {
        util.showModal('网络出错', `ERR:${err}`)
      },
      (res) => {
        wx.hideLoading();
      },
    )
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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