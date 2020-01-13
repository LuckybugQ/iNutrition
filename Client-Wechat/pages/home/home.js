//logs.js
var util = require('../../utils/util.js')
import Data from '../../utils/data.js'

var sliderWidth = 190// 需要设置slider的宽度，用于计算中间位置
// 最大行数
var max_row_height = 5;
// 行高
var food_row_height = 50;
// 底部栏偏移量
var cart_offset = 90;


Page({
  data: {
    array:['五谷杂粮','蔬菜','水果','肉、蛋、水产'],
    next:true,
    logs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0.5,
    // 右菜单
    menu_list: [],
    // 左菜单
    foodList: [],//展示菜品
    allFoodList: [],//所有获取到的菜品
    //我的订单列表
    orderList: [],
    // 购物车
    cartList: [],
    hasList: true,// 列表是否有数据
    totalPrice: 0,// 总价，初始为0
    totalNum: 0,  //总数，初始为0
    totalWeight: 0,  //总数，初始为0
    // 购物车动画
    animationData: {},
    animationMask: {},
    maskVisual: "hidden",
    maskFlag: true,
    // 左右两侧菜单的初始显示次序
    curNav: 0,

  },
  onShow: function (options) {
    // 购物车总量、总价
    var totalPrice = 0
    var totalNum = 0
    var totalWeight = 0
    var flag = true;
    // 更新购物车数量和总价、总重量、总数量
    var arr = wx.getStorageSync('cart') || [];
    var resFood = this.data.foodList;
    // 进入页面后判断购物车是否有数据，如果有，将菜单与购物车quantity数据统一
    if (arr.length > 0) {
      flag = false;
      for (var i in arr) {
        for (var j in resFood) {
          if (resFood[j].id == arr[i].id) {
            resFood[j].quantity = arr[i].quantity;
          }
        }
      }
      for (var i in arr) {
        totalPrice += arr[i].score * arr[i].quantity;
        totalWeight += arr[i].amount * arr[i].quantity;
        totalNum += Number(arr[i].quantity);
      }
      console.log(totalPrice);
      totalPrice /= totalNum;
    }
    // 赋值数据
    this.setData({
      next: flag,
      foodList: resFood,
      allFoodList: resFood,
      cartList: arr,
      totalPrice: totalPrice.toFixed(1),
      totalNum: totalNum,
      totalWeight: totalWeight
      })
    wx.hideLoading();
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var cata = options.cata || "food";
    var keyword = options.keyword || ""; 
    var flag = true;
    var that = this
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('cart') || [];
    // 右菜品菜单
    var foodList = that.data.foodList;
    var allFoodList = that.data.allFoodList;
    // 购物车总量、总价
    var totalPrice = 0
    var totalNum = 0
    var totalWeight = 0
    // 获取菜品列表数据
    var meal = wx.getStorageSync("meal")
    var resFood = [];
    for (var i = 0; i < meal.length; i++) {
      if (meal[i].name.indexOf(keyword) != -1 && meal[i].cata.indexOf(cata) != -1) {
        resFood.push(meal[i]);
      }
    };
    resFood.sort(that.compare("score"));
    if(resFood.length>0){
      that.setData({
      hasList:true
      })
    }else{
      that.setData({
        hasList: false
      })
    }
    // 进入页面后判断购物车是否有数据，如果有，将菜单与购物车quantity数据统一
    if (arr.length > 0) {
      flag = false;
      for (var i in arr) {
        for (var j in resFood) {
          if (resFood[j].id == arr[i].id) {
            resFood[j].quantity = arr[i].quantity;
          }
        }
      }
      for (var i in arr) {
        totalPrice += arr[i].score * arr[i].quantity;
        totalWeight += arr[i].amount * arr[i].quantity;
        totalNum += Number(arr[i].quantity);
      }
      totalPrice /= totalNum;
    }
    // 赋值数据
    that.setData({
      next: flag,
      cartList: arr,
      foodList: resFood,
      allFoodList: resFood,
      totalPrice: totalPrice.toFixed(1),
      totalNum: totalNum,
      totalWeight: totalWeight
    })
    wx.hideLoading();

  },
  // 购物车增加数量
  addCount: function (e) {
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('cart') || [];
    var f = false;
    for (var i in this.data.foodList) {// 遍历菜单找到被点击的菜品，数量加1
      if (this.data.foodList[i].id == id) {
        this.data.foodList[i].quantity += 1;
        if (arr.length > 0) {
          for (var j in arr) {// 遍历购物车找到被点击的菜品，数量加1
            if (arr[j].id == id) {
              arr[j].quantity += 1;
              f = true;
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
              break;
            }
          }
          if (!f) {
            arr.push(this.data.foodList[i]);
          }
        } else {
          arr.push(this.data.foodList[i]);
        }
        try {
          wx.setStorageSync('cart', arr)
        } catch (e) {
          console.log(e)
        }
        break;
      }
    }

    this.setData({
      next:false,
      cartList: arr,
      foodList: this.data.foodList
    })
    this.getTotalPrice();
  },
  // 定义根据id删除数组的方法
  removeByValue: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == val) {
        array.splice(i, 1);
        break;
      }
    }
  },
  // 购物车减少数量
  minusCount: function (e) {
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('cart') || [];
    for (var i in this.data.foodList) {
      if (this.data.foodList[i].id == id) {
        this.data.foodList[i].quantity -= 1;
        if (this.data.foodList[i].quantity <= 0) {
          this.data.foodList[i].quantity = 0;
        }
        if (arr.length > 0) {
          for (var j in arr) {
            if (arr[j].id == id) {
              arr[j].quantity -= 1;
              if (arr[j].quantity <= 0) {
                this.removeByValue(arr, id)
              }
              if (arr.length <= 0) {
                var p=0;
                this.setData({
                  next:true,
                  foodList: this.data.foodList,
                  cartList: [],
                  totalNum: 0,
                  totalPrice: p.toFixed(1),
                  totalWeight:0,
                })
                this.cascadeDismiss()
              }
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
            }
          }
        }
      }
    }
    this.setData({
      cartList: arr,
      foodList: this.data.foodList
    })
    this.getTotalPrice();
  },
  // 获取购物车总价、总数
  getTotalPrice: function () {
    var cartList = this.data.cartList;                  // 获取购物车列表
    var totalP = 0;
    var totalN = 0;
    var totalW = 0
    for (var i in cartList) {                           // 循环列表得到每个数据
      totalP += cartList[i].quantity * cartList[i].score;    // 所有价格加起来     
      totalW += cartList[i].quantity * cartList[i].amount;
      totalN += cartList[i].quantity
    }
    if(totalN!=0) {totalP /=  totalN;}
    this.setData({    
      cartList: cartList,
      totalNum: totalN,
      totalWeight: totalW,
      totalPrice: totalP.toFixed(1)
    });
  },
  // 清空购物车
  cleanList: function (e) {
    for (var i in this.data.foodList) {
      this.data.foodList[i].quantity = 0;
    }
    try {
      wx.setStorageSync('cart', "")
    } catch (e) {
      console.log(e)
    }
    this.setData({
      next:true,
      foodList: this.data.foodList,
      cartList: [],
      cartFlag: false,
      totalNum: 0,
      totalPrice: 0,
      totalWeight:0 ,
    })
    this.cascadeDismiss()
  },

  //删除购物车单项
  deleteOne: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var arr = wx.getStorageSync('cart')
    for (var i in this.data.foodList) {
      if (this.data.foodList[i].id == id) {
        this.data.foodList[i].quantity = 0;
      }
    }
    arr.splice(index, 1);
    if (arr.length <= 0) {
      this.setData({
        next:true,
        foodList: this.data.foodList,
        cartList: [],
        cartFlag: false,
        totalNum: 0,
        totalPrice: 0.0,
      })
      this.cascadeDismiss()
    }
    try {
      wx.setStorageSync('cart', arr)
    } catch (e) {
      console.log(e)
    }


    this.setData({
      cartList: arr,
      foodList: this.data.foodList
    })
    this.getTotalPrice()
  },
  //切换购物车开与关
  cascadeToggle: function () {
    var that = this;
    var arr = this.data.cartList
    if (arr.length > 0) {
      if (that.data.maskVisual == "hidden") {
        that.cascadePopup()
      } else {
        that.cascadeDismiss()
      }
    } else {
      that.cascadeDismiss()
    }

  },
  // 打开购物车方法
  cascadePopup: function () {
    var that = this;
    // 购物车打开动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
      delay: 0
    });
    that.animation = animation;
    animation.translate(0, -285).step();
    that.setData({
      animationData: that.animation.export(),
    });
    // 遮罩渐变动画
    var animationMask = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    });
    that.animationMask = animationMask;
    animationMask.opacity(0.8).step();
    that.setData({
      animationMask: that.animationMask.export(),
      maskVisual: "show",
      maskFlag: false,
    });
  },
  // 关闭购物车方法
  cascadeDismiss: function () {
    var that = this
    // 购物车关闭动画
    that.animation.translate(0,285).step();
    that.setData({
      animationData: that.animation.export()
    });
    // 遮罩渐变动画
    that.animationMask.opacity(0).step();
    that.setData({
      animationMask: that.animationMask.export(),
    });
    // 隐藏遮罩层
    that.setData({
      maskVisual: "hidden",
      maskFlag: true
    });
  },
  // 跳转确认订单页面
  gotoOrder: function () {
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder'
    })
  },

  GetQueryString:function (name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },

  search: function (e) {
    wx.navigateTo({
      url: '../search-food/search',
    })
  },
  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  tabSelect: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var array = ['grain','vegetable','fruit','meat']
    var options = {
      cata: array[id], 
    }
    that.onLoad(options)
    that.onShow()
  },

  camera() {
    var that = this
    var meal = wx.getStorageSync('meal')
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: function (res) {
        wx.showLoading({
          title: '识别中',
        })
        const tempFilePaths = res.tempFilePaths
        console.log('upload...');
        wx.uploadFile({
          url: Data.getUrl()+'classifyImage',
          filePath: tempFilePaths[0],
          name: 'image',
          success: function (res) {
            console.log(res.data);
            wx.hideLoading();
            if(res.data==-1){
              that.setData({
                modalName: 'fail',
              })
            }else{
            that.setData({
              id:res.data,
              camera:meal[res.data].name,
              modalName: 'camera',
              })
            }
            
          },fail: function(res){
            wx.showToast({
              title: '上传失败！',
            })
          }})
      }, fail: function (res) {
        wx.showToast({
          title: '选择图片失败！',
        })
      }
    });
  },
  cameraConfirm(e) {
    this.setData({
      canvasShow: false,
      modalName: null
    })
    this.setData({
      modalName: 'success',
    })
    var id =this.data.id
    var cart = wx.getStorageSync('cart') || [];
    var meal = wx.getStorageSync('meal')
    var m =meal[id]
    for (var i = 0; i < cart.length; i++) {
      if (id == cart[i].id) {
        cart[i].quantity += 1;
        m.quantity += 1;
      }
    }
    if (m.quantity < 1) {m.quantity += 1; cart.push(m);}
    wx.setStorageSync('cart', cart);
    this.onShow();
  },
  hideModal(e) {
    this.setData({
      canvasShow: false,
      modalName: null
    })
  },
})
