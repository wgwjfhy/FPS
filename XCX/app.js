//app.js
App({
  g_data:{
    l_lon:null,
    l_lat:null,
    l_p:null,
    url: 'http://192.168.0.107:8080',
    l_session:null
  },
  onLaunch: function () {
    var that = this;
    console.log("onLaunch");
    wx.login({
      success: function (res1) {
        if (res1.code) {
          wx.getUserInfo({
            success: function (res2) {
              wx.request({
                url: that.g_data.url+"/logIn",
                method: 'POST',
                data: {
                  code: res1.code,
                  encryptedData: res2.encryptedData,
                  iv: res2.iv
                },
                success: function(e){
                  if(e != "fail"){
                    that.g_data.l_session = e.data;
                  }else{
                    console.log(e);
                  }
                },
                fail: function(e){
                  console.log(e);
                }
              });
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})