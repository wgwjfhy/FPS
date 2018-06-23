// pages/detail/detail.js
var dateTimePicker = require('../../utils/dateTimePicker.js');

Page({
  data: {
    
  },
  onLoad(e) {
    var that = this;
    var g_data = getApp().g_data;
    wx.request({
      url: g_data.url + "/parking/" + g_data.l_session + "/" + e.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.result ==true) {
          var data = res.data.space;
          that.setData({
            m_t: data.money,
            img_src: data.imgPath
          });
        } else {

        }
      },
      fail: function (e) {
        console.log(e);
      }
    });
  }
  
})
