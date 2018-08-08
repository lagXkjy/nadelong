"use strict"
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const showModal = (title,content)=>{
  wx.showModal({
    title,
    content,
    showCancel:false
  })
}
const showLoading = (title) => {
  wx.hideLoading();
  wx.showLoading({
    title: title
  })
}
const $request = (url,method = "POST",data,success,fail,complete)=>{
  typeof success === 'function' ? success : function success(res){}
  typeof fail === 'function' ? fail : function fail(err) { }
  typeof complete === 'function' ? complete : function complete(res) { }
  wx.request({
    url,
    method,
    data,
    header: { 'content-type': 'application/json' },
    success:(res)=>{
      success(res)
    },
    fail:(err)=>{
      fail(err)
    },
    complete:(res)=>{
      complete(res)
    }
  })
}
const $http = (url, method = "POST", data)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      method,
      data,
      header: { 'content-type': 'application/json' },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
      complete: (res) => {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  })
}
module.exports = {
  formatTime,
  showModal,
  $request,
  $http,
}
