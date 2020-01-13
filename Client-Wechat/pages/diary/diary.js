import Canvas from '../../utils/canvas.js'
var util = require('../../utils/util.js');
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalScore: 10,           // 总价，初始为0
    daka:true,
    hasdaka:true,
    canvasShow:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    //检查今天是否已经打了卡
    var time = util.formatTime(new Date());
    var today = wx.getStorageSync(time);
    if(today.length>0){
      this.setData({
        hasdaka:false,
      })
    }else{
      this.setData({
        hasdaka: true,
      })
    }


    var value = wx.getStorageSync('diary')
    if (value.length) {
    this.setData({
      hasList: true,        // 既然有数据了，那设为true吧
      carts: value,
    });}else{
    this.setData({
      hasList: false, 
      carts: [],
    });  
    }
    this.getScore();
  },

  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;

    var meal = wx.getStorageSync("meal");
    meal[carts[index].id].add=false;
    wx.setStorageSync("meal", meal)

    carts.splice(index, 1);
    wx.setStorageSync('diary', carts);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    }
    this.getScore();
    wx.showToast({
      title: '已移出今日食谱！',
      icon: 'success',
      duration: 2000
    })
  },
  getScore() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let has=this.data.hasdaka;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      total += carts[i].score / carts.length; 
      
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalScore: total.toFixed(1)*10
    });
    
    this.draw('runCanvas', total*10, 500);
    if(total>=5 && has==true){
      this.setData({                                // 最后赋值到data中渲染到页面
        daka: false,
      });
    }else{
      this.setData({                                // 最后赋值到data中渲染到页面
        daka: true,
      });
    }
  },

  daka: function(e){
    this.setData({
      hasdaka: false,
      daka:true,
      modalName: 'dakaSuccess',
    })
    var time = util.formatTime(new Date());
    console.log(time);
    var gold = wx.getStorageSync('gold') || 0
    gold += 1;
    wx.setStorageSync('gold', gold)
    var selected = wx.getStorageSync('selected') || []
    selected.push({date:time})
    wx.setStorageSync('selected', selected)
    var diary = this.data.carts;
    wx.setStorageSync(time, diary);
    var daka=wx.getStorageSync("daka") || 0
    wx.setStorageSync("daka", daka+1);
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

  showModal(e) {
    this.setData({
      canvasShow:true,
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      canvasShow: false,
      modalName: null
    })
  },
})