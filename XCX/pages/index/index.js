//index.js
var controls = [{
  id: 'locationBtn',
  iconPath: '/image/myLocation.png',
  position: {
    left: 10,
    top: 400,
    width: 50,
    height: 50
  },
  clickable: true
}, {
  id: 'shareBtn',
  iconPath: '/image/share.png',
  position: {
    left: 10,
    top: 310,
    width: 50,
    height: 50
  },
  clickable: true
}];

var m_markers = [];

Page({
  data: {
    
  },
  onLoad:function(e){
    //this.listParkingSpace();
  },
  onShow:function(e){
    
  },
  createMarker:function(id,lat,lon){
    return {
      iconPath: "/image/location.png",
      id: id,
      latitude: lat,
      longitude: lon,
      width: 50,
      height: 50,
      label: {
        content: 'label',
        color: '#E80505',
        x: -10,
        y: -10
      }
    };
  },
  requestListParkingSpace: function (g_data,southwest,northeast){
    var that = this;

    wx.request({
      url: g_data.url + "/parking/" + g_data.l_session,
      data: {
        minX: southwest.longitude, 
        minY: southwest.latitude, 
        maxX: northeast.longitude,
        maxY: northeast.latitude
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.result == true) {
          var data = res.data.spaces;
          for (var i = 0; i < data.length; i++) {
            var lat = data[i].lat;
            var lon = data[i].lon;
            m_markers.push(that.createMarker(data[i].id, lat, lon));
          }
          that.setData({ markers: m_markers });
        } else {

        }
      },
      fail: function (e) {
        console.log(e);
      }
    });
  },
  listParkingSpace:function(){
    var that = this;
    var g_data = getApp().g_data;
    
    that.mapCtx.getRegion({
      success: function (res){
        console.log(res);
        that.requestListParkingSpace(g_data,res.southwest, res.northeast);
      },
      fail: function(){
        console.log("gerRegion fail");
      },
      complete: function(){
        console.log("gerRegion complete");
      }
    });
    
   /* that.mapCtx.getScale({
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        console.log("gerRegion fail");
      },
      complete: function () {
        console.log("gerRegion complete");
      }
    });*/
  
    
  },
  onReady:function(e){
    var that = this;
    that.mapCtx = wx.createMapContext('myMap');
    that.setData({ controls: controls});
  },
  controltap:function(e){
    if (e.controlId === "locationBtn"){
      this.moveLocation();
      return;
    }
    if (e.controlId === "shareBtn"){
      var that = this;
      this.moveLocation();
      this.mapCtx.getCenterLocation({
        success: function (res) {
          that.mapCtx.includePoints({
            padding: [1],
            points: [{
              latitude: res.latitude,
              longitude: res.longitude
            }]
          });
          getApp().g_data.l_lat = res.latitude;
          getApp().g_data.l_lon = res.longitude;
          
          wx.navigateTo({
            url: '../share/share'
          })
        }
      });

    }

  },
  markertap:function(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.markerId
    })
  },
  moveLocation:function(){
    this.mapCtx.moveToLocation();
  }


})