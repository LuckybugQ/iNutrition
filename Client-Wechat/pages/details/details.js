import Data from '../../utils/data.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[],
    foods: [{ name: '鸡蛋', quantity: '5个' }, { name: '番茄', quantity: '5个' }, { name: '葱', quantity: '1根' }, { name: '盐', quantity: '1勺' }, { name: '油', quantity: '适量' }, { name: '砂糖', quantity: '少许' },],
    steps: [{
      image:'http://i2.chuimg.com/5bcd1e1f8acb4179a73231b37783b80b_2048w_1722h.jpg?imageView2/2/w/300/interlace/1/q/90',
      text: "选择比较成熟的番茄，捏着比较软，这样的番茄多汁，味道好一些，然后用刀划十字，放入开水里面烫一下，过入凉水，去皮"
    }, {
        image: 'http://i2.chuimg.com/38fbba613b844b198311dbd43f5c6683_2022w_2048h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "番茄切成小块儿，喜欢多汁的就切碎一点"
      }, {
        image: 'http://i2.chuimg.com/2fd03bec614a46ab841d8208d3e28bf9_2000w_2668h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "大蒜去皮切成蒜末"
      }, {
        image: 'http://i2.chuimg.com/c0b9dea31a90433092d43dea7ea54363_2208w_1536h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "小葱切碎"
      }, {
        image: 'http://i2.chuimg.com/d539ffda408d4214ae22d57b2d1d4bd5_2048w_1804h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "鸡蛋加少许盐打散"
      }, {
        image: 'http://i2.chuimg.com/b683696efb95484c90500761b491a8b7_2668w_2668h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "锅里放油烧热，倒入蛋液，用筷子划，凝固就可以出锅备用"
      }, {
        image: 'http://i2.chuimg.com/7797e400f6c345dcb27e05fa2dfafaa8_2668w_2668h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "就着炒鸡蛋的油，可以不再放油，锅里放入番茄翻炒，加入盐"
      }, {
        image: 'http://i2.chuimg.com/295a0a61d7f64641b1e709cb04ed16bb_2000w_2668h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "汤汁比较浓厚时，放入炒好的鸡蛋"
      }, {
        image: 'http://i2.chuimg.com/c96a27ef3e1c45c0910d920c2c281cf8_1000w_1000h.jpg?imageView2/2/w/300/interlace/1/q/90',
        text: "翻炒一下，就可以出锅了，最后撒上葱花。"
      },],
    Tab:['营养成分','烹饪方法'],
    build:false,
    id:1,
    carts: [],               // 购物车列表
    delFlag: true,
    buiFlag: true,
    fat:10,
    carbs:10,
    protein:42,
    TabCur: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

  },
  onLoad: function (options) {
    var id = options.id;
    var build = options.build || false;
    var value = wx.getStorageSync('meal') || [];
    var diary = wx.getStorageSync('diary') || [];
    var temp = value[id];
    var tab = ['营养成分','推荐食谱']
    if(temp.cata.indexOf("food")!=-1){
      this.setData({
        buiFlag: false,
        Tab:tab
      });
    }
    var carts = [];
    carts.push(temp);
    this.getRecommend(temp);
    for (var i = 0; i < diary.length; i++) {
      if(diary[i].id == carts[0].id){
        this.setData({
          delFlag:false
        });};
    }
    this.setData({
      build:build,
      carts:carts
    });
  },
  add: function () {
    this.setData({
      delFlag: false
    });
    
    var value = wx.getStorageSync('diary') || [];
    var id = this.data.remarks;
    var carts = this.data.carts;
    value.push(carts[0]);
    wx.setStorageSync('diary', value);

    var meal = wx.getStorageSync('meal');
    console.log(meal[carts[0].id].name)
    meal[carts[0].id].add=true;
    wx.setStorageSync('meal', meal);
    
    
    wx.showToast({
      title: '已加入今日食谱',
      icon: 'success',
      duration: 2000
    })
  },

  del: function () {//删除diary中的食谱

    this.setData({
      delFlag: true
    });
    var diary = wx.getStorageSync('diary');
    var carts = this.data.carts;
    var index = 0;
    for (var i = 0; i < diary.length; i++) {
      if (diary[i].id == carts[0].id) {
        index = i;
      };
    }
    diary.splice(index, 1);
    wx.setStorageSync('diary', diary)
    var meal = wx.getStorageSync('meal');
    meal[carts[0].id].add = false;
    wx.setStorageSync('meal', meal);
    wx.showToast({
      title: '已移出今日食谱！',
      icon: 'success',
      duration: 2000
    })
  },

  bui: function () {//跳转到home
    var cart = wx.getStorageSync('cart') || [];
    var tcarts = this.data.carts;
    var build = this.data.build;
    for(var i=0;i<cart.length;i++){
      if(tcarts[0].id == cart[i].id){
        cart[i].quantity+=1;
        tcarts[0].quantity += 1;
      }
    }
    if (tcarts[0].quantity < 1) { tcarts[0].quantity += 1;cart.push(tcarts[0]);}
    wx.setStorageSync('cart', cart);
    if(build){
      wx.navigateBack()
    }else{
    wx.redirectTo({
      url: '../home/home'
      })}
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  getRecommend(tmp) {
    var meal = wx.getStorageSync('meal') || [];
    var swiperList = []
      var food = tmp
      for (var j = Data.getFoodNum(); j < meal.length; j++) {
        var m = meal[j]
        m.foodscore = m.foodscore || parseInt(m.score)
        var list = m.list
        for (var k = 0; k < list.length; k++) {
          if (list[k] == food.id) {
            console.log(m.name)
            m.foodscore += 10
            break
          }
        }

      }
    console.log(meal)
    meal.sort(function (a, b) {
      return (a.foodscore || 0) - (b.foodscore || 0)
    })
    console.log(meal)
    for (var i = meal.length - 1; i > meal.length - 6; i--) {
      swiperList.push(meal[i])
    }
    console.log(swiperList)
    this.setData({
      recommendList: swiperList
    })
  }
})