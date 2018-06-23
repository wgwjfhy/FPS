// pages/ad/ad.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  videoErrorCallback: function(e){
    console.log(e);
    wx.redirectTo({
      url: '../index/index'
    });
  },
  end:function(e){
    wx.redirectTo({
      url: '../index/index'
    });
  }
})