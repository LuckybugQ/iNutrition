Page({
  /**
   * 页面的初始数据
   */
  data: {
    cata:"breakfast",
    carts: [],               // 购物车列表
    hasList: true,          // 列表是否有数据
    totalScore: 0,           // 总价，初始为0
    loaded:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var carts = [];
    var meal = wx.getStorageSync("meal");
    var cata = options.cata || "";
    var keyword = options.keyword || "";
    console.log("Search:"+ cata +";"+ keyword);
    for(var i=0;i<meal.length;i++){
      if(meal[i].cata.indexOf(cata)!=-1 && meal[i].name.indexOf(keyword)!=-1){
        carts.push(meal[i]);
      }
    };
    this.setData({
      cata:cata,
    });
    carts.sort(this.compare("score"));

    if (carts.length) {
      this.setData({
        hasList: true,
        loaded:true,
        carts: carts,
      });
    }else{
      this.setData({
        loaded: true,
        hasList: false,
      });
    }
    wx.hideLoading()
  },
  
  onShow: function (options) {
    //每次需要刷新一次ADDED
    var meal=wx.getStorageSync('meal');
    var carts=this.data.carts;
    for(var i=0;i<carts.length;i++){
       carts[i].add=meal[carts[i].id].add || false;
    }
    this.setData({
      carts:carts,
    })
  },

  search: function (e) {
    var cata = this.data.cata;
    wx.redirectTo({
      url: '../search/search?cata='+cata,
    })
  },

compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
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


  add: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var carts = this.data.carts;
    var currentMeal = carts[index]; 
    if(currentMeal.cata.indexOf('food')!=-1){
      var cart = wx.getStorageSync('cart') || [];
      var tcarts = this.data.carts;
      var build = this.data.build;
      for (var i = 0; i < cart.length; i++) {
        if (currentMeal.id == cart[i].id) {
          cart[i].quantity += 1;
          currentMeal.quantity += 1;
        }
      }
      if (currentMeal.quantity < 1) { currentMeal.quantity += 1; cart.push(currentMeal); }
      wx.setStorageSync('cart', cart);
      wx.redirectTo({
          url: '../home/home'
        })

    }else{
    var value = wx.getStorageSync('diary') || [];
    
    value.push(currentMeal);
    wx.setStorageSync('diary', value);

    var meal = wx.getStorageSync('meal');
    meal[currentMeal.id].add = true;
    wx.setStorageSync('meal', meal);

    carts[index].add=true;
    this.setData({
      carts: carts
    });


    wx.showToast({
      title: '已加入今日食谱！',
      icon: 'success',
      duration: 2000
    })}
  },

  del: function (e) {//删除diary中的食谱

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