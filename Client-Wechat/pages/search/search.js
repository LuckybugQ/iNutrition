// 1 导入js文件
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({
  data: {
  cata:{},
  },
  onLoad: function (options) {
    var meal = wx.getStorageSync("meal");
    var name = []
    for(var i=0;i<meal.length;i++){
      name.push(meal[i].name);
    };
    var cata = options.cata || "";
    console.log("Catalogy:"+cata);
    this.setData({
        cata:cata,
    });
    var hotspot = [];
    if (cata == "") { hotspot = ['宫保鸡丁', '香煎牛排', '豚骨拉面'] }
    if (cata == "meal") { hotspot = ['宫保鸡丁','香煎牛排','豚骨拉面'] }
    if (cata == "breakfast") { hotspot = ['全麦面包']}
    if (cata == "lunch") { hotspot = ['番茄炒蛋'] }
    if (cata == "dinner") { hotspot = ['水果沙拉'] }
    if (cata == "noodle") { hotspot = ['荞麦面'] }
    if (cata == "vegetarian") { hotspot = ['开水白菜'] }
    if (cata == "keep") { hotspot = ['柠檬鸡胸'] }
    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      hotspot, // 热点搜索推荐，[]表示不使用
      name,// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );

  },
  onShow: function () {
    // 2 搜索栏初始化
    var that = this;
  },
  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    var cata =this.data.cata;
    // do your job here
    // 示例：跳转
    wx.redirectTo({
      url:'../searchresult/searchresult?cata='+ cata +'&keyword=' + value,
    })
  },

  // 5 返回回调函数
  myGobackFunction: function () {
  }

})