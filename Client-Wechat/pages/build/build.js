

Page({
  /**
   * 页面的初始数据
   */
  data: {
    color:"springgreen",
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalScore: 0,           // 总价，初始为0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    
    var value = wx.getStorageSync('build')
    var meal = wx.getStorageSync('meal');
    if (value.length) {
      for (var i = 0; i < value.length; i++) {
        value[i].add = meal[value[i].id].add || false;
      }
      this.setData({
        hasList: true,
        carts: value,
      });
    }else{
      this.setData({
        hasList: false,
        carts: [],
      });
    }
    //每次需要刷新一次ADDED
  },

  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    wx.setStorageSync('build', carts)
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    }
    wx.showToast({
      title: '已删除该膳食！',
      icon: 'success',
      duration: 2000
    })
  },

  add: function () {
    wx.navigateTo({
      url: '../home/home'
    })
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  add2: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var carts = this.data.carts;
    var currentMeal = carts[index];
    var value = wx.getStorageSync('diary') || [];
      value.push(currentMeal);
      wx.setStorageSync('diary', value);

      var meal = wx.getStorageSync('meal');
      meal[currentMeal.id].add = true;
      wx.setStorageSync('meal', meal);

      carts[index].add = true;
      this.setData({
        carts: carts
      });


      wx.showToast({
        title: '已加入今日食谱！',
        icon: 'success',
        duration: 2000
      })
    
  },

  del2: function (e) {//删除diary中的食谱

    const ind = e.currentTarget.dataset.index;
    var diary = wx.getStorageSync('diary');
    var carts = this.data.carts;
    var index = 0;
    for (var i = 0; i < diary.length; i++) {
      if (diary[i].id == carts[ind].id) {
        index = i;
      };
    }
    diary.splice(index, 1);
    wx.setStorageSync('diary', diary)
    var meal = wx.getStorageSync('meal');
    meal[carts[ind].id].add = false;
    wx.setStorageSync('meal', meal);

    carts[ind].add = false;
    this.setData({
      carts: carts
    });

    wx.showToast({
      title: '已移出今日食谱！',
      icon: 'success',
      duration: 2000
    })
  },
})