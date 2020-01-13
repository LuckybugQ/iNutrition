//获取应用实例
import Data from '../../utils/data.js'
const app = getApp()

Page({
  data: {
    test:false,
    swiperList: [{}],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    },
  onLoad: function () {
    wx.showLoading({
      title: '推荐加载中',
    })
    var that = this;
    var list = []
    var meal = wx.getStorageSync('meal')
    var user = wx.getStorageSync('user')
    var area = user.place
      wx.request({
        url: Data.getUrl() + 'recommend',
        data: {
          'area': area,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          for(var i = 0;i<res.data.length;i++){
            var m = meal[res.data[i]+80];
            list.push(m)
          }
          console.log(list)
          that.setData({
            swiperList:list
          })
          wx.hideLoading();
        },
      })
  },
 search: function (e) {
    wx.navigateTo({
      url: '../search/search?cata=',
    })
  },

})
