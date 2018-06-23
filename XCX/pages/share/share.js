//pages/share/share.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  data: {
    picker1: null,
    picker2: null,
    picker3: null,
    sy_begin: "",
    sy_end: "",
    sy_fb: "",
    startYear: 2018,
    endYear: 2050,
    m_t:0
  },
  onLoad() {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var picker1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var picker2 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var picker3 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉 
    picker1.dateTimeArray.pop();
    picker2.dateTimeArray.pop();
    picker3.dateTimeArray.pop();
    picker1.dateTime.pop();
    picker2.dateTime.pop();
    picker3.dateTime.pop();
    var sy_begin = this.getCurrentSelectTime(picker1);
    var sy_fb = this.getCurrentSelectTime(picker3);
    
    this.setData({
      picker1: picker1,
      picker2: picker2,
      picker3: picker3,
      sy_begin: sy_begin,
      sy_fb: sy_fb
    });
  },
  getCurrentSelectTime(dateTimePicker){
    var lastArray = dateTimePicker.dateTimeArray;
    var lastTime = dateTimePicker.dateTime;
    return lastArray[0][lastTime[0]] + "-" + lastArray[1][lastTime[1]] + "-" + lastArray[2][lastTime[2]] + " " + lastArray[3][lastTime[3]] + ":" + lastArray[4][lastTime[4]];
  },
  changeDateTime1: function(e) {
    var arr = this.data.picker1.dateTime, dateArr = this.data.picker1.dateTimeArray;
    this.data.picker1.dateTime = e.detail.value;
    var currentTime = this.getCurrentSelectTime(this.data.picker1);
    
    this.setData({
      sy_begin: currentTime
    });
  },
  changeDateTime2: function (e) {
    var arr = this.data.picker2.dateTime, dateArr = this.data.picker2.dateTimeArray;
    this.data.picker2.dateTime = e.detail.value;
    var currentTime = this.getCurrentSelectTime(this.data.picker2);
    
    this.setData({
      sy_end: currentTime
    });
  },
  changeDateTime3: function (e) {
    var arr = this.data.picker3.dateTime, dateArr = this.data.picker3.dateTimeArray;
    this.data.picker3.dateTime = e.detail.value;
    var currentTime = this.getCurrentSelectTime(this.data.picker3);
    console.log(currentTime);
    this.setData({
      sy_fb: currentTime
    });
  },
  share:function(e){
    var g_data = getApp().g_data;
    var c_data = this.data;
  
    wx.uploadFile({
      url: g_data.url + "/parking/" + g_data.l_session,
      filePath: c_data.src[0],
      name: 'fileName',
      formData: {
        'lon': g_data.l_lon,
        'lat': g_data.l_lat,
        'money': c_data.m_t,
        'fb_date': c_data.sy_fb,
        'share_begin': c_data.sy_begin,
        'share_end': c_data.sy_end
      },
      success: function (res) {
        console.log(res);
        if (res.data == '{"result":true}') {
          wx.navigateTo({
            url: '../index/index'
          });
        }
      }
    });
  },
  setInptValue: function(e){
    this.setData({
      m_t: e.detail.value,
      m_p: e.detail.value/100
    });
  },
  selectImg: function() {
    var _this = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        _this.setData({
          src: res.tempFilePaths
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  error(e) {
   console.log(e);
  }
})