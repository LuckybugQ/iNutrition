Page({

  /**
   * 页面的初始数据
   */
  data: {
    updown:false,
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    selected: [],
    totalPrice:9.9,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查找那些时间已经打过卡了
    wx.showLoading({
      title: '加载中',
    })
    var selected = wx.getStorageSync('selected')
    this.setData({
      selected:selected
    })
    wx.hideLoading();
  },
  /**
  * 日历是否被打开
  */
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    wx.showLoading({
      title: '加载中',
    })
    let time = e.detail;
    let today = time.year +"-"+ time.month + "-" + time.date;
    console.log(today)
    var carts = wx.getStorageSync(today);
    if (carts.length) {
      this.setData({
        hasList: true,
        carts: carts,
      });
    } else {
      this.setData({
        hasList: false,
      });
    }
    this.getScore();
    wx.hideLoading()

  },
  getScore() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let updown = true;
    let h = wx.getStorageSync("healthy") || 0
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      total += carts[i].score / carts.length;
    }
    if(total>=h){updown =true;}else{updown=false;}
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      updown:updown,
      totalPrice: total.toFixed(1)
    });
  },
})