// page/component/new-pages/user/user.js
import Data from '../../utils/data.js'

Page({
  data: {
    array1: ['男', '女'],
    array2: [],
    array3: [],
    array4: [],
    array5: [],
    array6: ['低','中','高'],
    sports:1,
    multiArray:[[],[]],
    gender:0,
    birthday: "1996-08-03",
    place: ["四川省", "成都市", "郫都区"],
    height:170,
    weight:60,
    tnb:false,
    gxy:false,
    xieya: [115, 75],
    fatrate:17,
    xietang:50,
    thumb: '',
    nickname: '',
  },
  onLoad() {
    wx.showLoading({
      title: '数据加载中',
    })
    var array2=this.data.array2;
    var array3 =this.data.array3;
    var array4 = this.data.array4;
    var array5 = this.data.array5;
    var multiArray = this.data.multiArray;
    for (var i = 100; i <= 250; i++) {
      array2.push(i);
    }
    for (var i = 0; i <= 200; i++) {
      array3.push(i);
      multiArray[0].push(i);
      multiArray[1].push(i);
    }
    for (var i = 0; i <= 50; i++) {
      array4.push(i);
    }
    for (var i = 0; i <= 15; i+=0.1) {
      array5.push(i.toFixed(1));
    }
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
    var user =wx.getStorageSync("user");
    var gender = user.gender;
    var height = user.height;
    var weight = user.weight;
    var birthday = user.birthday;
    var place = user.place;
    var xieya = user.xieya;
    var fatrate = user.fatrate;
    var xietang = user.xietang;
    var tnb = user.tnb;
    var gxy = user.gxy;
    var sports = user.sports;
    this.setData({
      height: height,
      weight: weight,
      gender: gender,
      birthday:birthday,
      place:place,
      tnb: tnb,
      gxy: gxy,
      xieya:xieya,
      xietang: xietang,
      fatrate: fatrate,
      sports: sports,
      array2:array2,
      array3:array3,
      array4: array4,
      array5: array5,
      multiArray: multiArray,
    })
    wx.hideLoading()
  },
  genderChange: function (e) {
    var t = e.detail.value;
    this.setData({
      gender: t,
    })
  },
  sportsChange: function (e) {
    var t = e.detail.value;
    this.setData({
      sports: t,
    })
  },
  birthdayChange: function (e) {
    var t = e.detail.value;
    this.setData({
      birthday: t,
    })
  },
  placeChange: function (e) {
    var t = e.detail.value;
    this.setData({
      place: t,
    })
  },
  heightChange: function (e) {
    var t = e.detail.value;
    this.setData({
      height: t,
    })
  },
  weightChange: function (e) {
    var t = e.detail.value;
    this.setData({
      weight: t,
    })
    },
  gxyChange: function (e) {
    var t = e.detail.value;
    this.setData({
      gxy: t,
    })
  },
  tnbChange: function (e) {
    var t = e.detail.value;
    this.setData({
      tnb: t,
    })
  },
  xieyaChange(e) {
    this.setData({
      xieya: e.detail.value
    })
  },
  xietangChange(e) {
    this.setData({
      xietang: e.detail.value
    })
  },
  fatrateChange(e) {
    this.setData({
      fatrate: e.detail.value
    })
  },
  confirm:function(){
    var that = this
    wx.showLoading({
      title: '数据提交中',
    })
    var u = wx.getStorageSync('user') || {}
    var m = wx.getStorageSync('meal') || []
    u.gender = this.data.gender;
    u.birthday = this.data.birthday;
    u.place = this.data.place;
    u.height = this.data.height;
    u.weight = this.data.weight;
    u.gxy = this.data.gxy;
    u.tnb = this.data.tnb;
    u.xieya = this.data.xieya;
    u.xietang = this.data.xietang;
    u.fatrate = this.data.fatrate;
    u.sports = this.data.sports;
    var score = Data.getScore(u)
    console.log(u);
    //更新健康指数
    wx.setStorageSync("healthy", score)
    wx.setStorageSync("user", u)
    
    wx.request({
      url: Data.getUrl() + 'score',
      data: {
        'meal':m,
        'user':u,
        'all':m
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        
        for(var i=0;i<res.data.length;i++){
          var m=res.data[i]
          var s=m.score
          m.eva = that.getEva(s)
          m.color = that.getColor(s)
        }
        wx.setStorageSync('meal', res.data)
        wx.hideLoading();
        wx.switchTab({
          url: '../user/home',
        })
        wx.showToast({
          title: '数据提交成功！',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  getEva: function (s) {
    var eva = "Bad";
    if (s >= 2) { eva = "Limit" }
    if (s >= 4) { eva = "Normal" }
    if (s >= 6) { eva = "Good" }
    if (s >= 9) { eva = "Excellent" }
    return eva;
  },
  getColor: function (s) {
    var c = "#e54d42";
    if (s >= 2) { c = "#fbbd08" }
    if (s >= 4) { c = "#666666" }
    if (s >= 6) { c = "#8dc63f" }
    if (s >= 9) { c = "#39b54a" }
    return c;
  },
})