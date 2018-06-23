// pages/permissions/main.js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 查看是否授权
   /* wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log("onLoad");
              console(res)
            }
          })
        }
      }
    })*/
  },
  bindGetUserInfo: function (e) {
    /*console.log(e.detail.userInfo);
    wx.getUserInfo({
      success: function (res) {
        console.log("2");
        console(res)
      }
    })*/
    wx.navigateTo({
      url: '../index/index'
    })
  }
})