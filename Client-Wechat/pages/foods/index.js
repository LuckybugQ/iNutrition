//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
  },
  search: function (e) {
    wx.navigateTo({
      url: '../search/search?cata=food',
    })
  },
})
