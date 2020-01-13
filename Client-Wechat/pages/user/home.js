// page/component/new-pages/user/user.js
import Init from '../../utils/init.js'
var util = require('../../utils/util.js');
Page({
  data: {
    ...Init.data,
    healthy: 0,
    daka: 0,
    gold: 0,
  },
  onShow() {
    var daka = wx.getStorageSync("daka") || 0
    var healthy = wx.getStorageSync("healthy") || '0.0'
    var gold = wx.getStorageSync("gold") || 0
    this.setData({
      daka: daka,
      healthy: healthy,
      gold:gold,
    })
  },
  clean() {
    wx.showLoading({
      title: '清理中',
    });
    wx.clearStorageSync();
    Init.init(false);
    this.onShow();
    wx.hideLoading();
    wx.showToast({
      title: '清理成功！',
      icon: 'success',
      duration: 2000
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})