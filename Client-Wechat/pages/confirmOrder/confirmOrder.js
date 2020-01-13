import Data from '../../utils/data.js'

Page({
 //页面的初始数据
  data: {
    swiperList: [],
    classes_array: [{ name: '炒', checked: true, id: 1 }, { name: '煎', checked: false, id: 2 }, { name: '蒸', checked: false, id: 3 }, { name: '炖', checked: false, id: 4 }, { name: '煮', checked: false, id: 5 }, { name: '烤', checked: false, id: 6 }, { name: '焖', checked: false, id: 7 }, { name: '炸', checked: false,id: 8 }],
    id:0,
    cook : 1,
    confirmOrder: [],
    number:0,
    // 备注信息
    remarks:"",
    // 购物车数据
    cartList:{},
    totalPrice: 0,
    displayPrice: 0,
    totalNum: 0,
    totalCal:0,
    totalWeight:0,
    totalNutrition: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // 遮罩
    maskFlag:true,
    orderlist:[],
    imgList: [],
    list:[]
  },
   // 生命周期函数--监听页面加载
  onLoad:function(Options){
    this.getRecommend()
    var that = this;
    var arr = wx.getStorageSync('cart') ||[];
    for(var i in arr){
      for(var j=0;j<arr[i].quantity;j++){
        this.data.list.push(arr[i].id);
      }
      this.data.totalNum += arr[i].quantity;
      this.data.totalPrice += arr[i].quantity * arr[i].score;
      this.data.totalWeight += arr[i].quantity * arr[i].amount;
      this.data.totalCal += arr[i].quantity*arr[i].cal;
      for(var j =0;j<=14;j++){
        this.data.totalNutrition[j] += arr[i].quantity * arr[i].nutrition[j]; 
      }
    }
    this.data.totalPrice /= this.data.totalNum;
    this.data.totalPrice = this.data.totalPrice.toFixed(1),
    this.data.displayPrice = Number(this.data.totalPrice);
    this.data.displayPrice += 0.075;
    console.log(this.data.displayPrice)
    for (var j = 0; j <= 14; j++) {
      this.data.totalNutrition[j] = (this.data.totalNutrition[j]).toFixed(2);
    }
    this.setData({
      cartList:arr,
      totalPrice: this.data.totalPrice,
      displayPrice: this.data.displayPrice.toFixed(1),
      totalNum: this.data.totalNum,
      totalWeight: this.data.totalWeight,
      totalCal: this.data.totalCal.toFixed(1),
      totalNutrition: this.data.totalNutrition

    })
   
  },
  // 获取输入的烹饪方式
  //点击radio-group中的列表项事件
  radiochange: function (res) {
    console.log("选中的标签：" + res.detail.value);
    var arrs = this.data.classes_array;
    var that = this;
    for (const x in arrs) {
      if (arrs[x].id == res.detail.value) {
        arrs[x].checked = true;
      } else {
        arrs[x].checked = false;
      }
    }
    that.setData({
      classes_array: arrs
    })
    this.updateScore(res.detail.value);
  },
  updateScore: function (e) {
    var tp = parseFloat(this.data.totalPrice);
    var id = parseFloat(e);
    tp=tp+id*0.075;
    if(tp>9.9){tp=9.9};
    console.log(tp);
    this.setData({
      cook:id,
      displayPrice: tp.toFixed(1)
    })
  },
  // 获取菜谱名称
  getRemark: function (e) {
    var remarks = this.data.remarks;
    this.setData({
      number:0,
      remarks: e.detail.value
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
  complete: function () {//完成meal创建，写入到build和meal中
    var that=this
    wx.showLoading({
      title: '制作膳食中',
    })
    var value = wx.getStorageSync('build') || [];
    var value2 = wx.getStorageSync('meal') || [];
    var length = value2.length;
    var name =this.data.remarks;
    var cal = this.data.totalCal;
    var amount = this.data.totalWeight;
    var nutrition = this.data.totalNutrition;
    var list = this.data.list
    var ima = this.data.imgList[0] || wx.getStorageSync('cart')[0].image;
    if(name.length==0){name="没有名字的膳食"}
    var m = [{ 
      id: length, 
      name: name, 
      image: ima, 
      cal: cal, 
      amount: amount, 
      nutrition:nutrition,
      cata:'meal',
      list:list,
    }]
    var u = wx.getStorageSync('user')
    wx.request({
      url: Data.getUrl() + 'score',
      data: {
        'meal': m,
        'user': u,
        'all':value2
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var m = res.data[0]
        var score = Number(that.data.displayPrice);
        var cook = that.data.cook
        //score = score + cook*0.075;
        if(score>9.9){score=9.9}
        m.score = score.toFixed(1);
        m.eva = that.getEva(score);
        m.color = that.getColor(score);
        value.push(m);//很关键
        value2.push(m);
        wx.setStorageSync('cart', []);
        wx.setStorageSync('build', value)
        wx.setStorageSync('meal', value2)
        wx.hideLoading();
        wx.switchTab({
          url: '../build/build',
        })
      },
    })
    
  },


  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: [ 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  SearchImg(e) {
    wx.showLoading({
      title: '图片匹配中',
    })
    var that = this
    var name = this.data.remarks || '牛油果';
    var number = this.data.number
    wx.request({
      url: Data.getUrl() + 'searchImage',
      data: {
        'name': name,
        'number':number,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var imgList = []
        imgList = imgList.concat(res.data)
        var number = that.data.number
        that.setData({
          imgList: imgList,
          number: number+1
        })
        wx.hideLoading()
        wx.showToast({
          title: '图片匹配成功！',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  getRecommend(){
    var cart = wx.getStorageSync('cart') || [];
    var meal = wx.getStorageSync('meal') || [];
    var swiperList = []
    for(var i=0;i<cart.length;i++){
      var food = cart[i] 
      for (var j=Data.getFoodNum();j<meal.length;j++){       
        var m = meal[j]
        console.log(m);
        m.foodscore = m.foodscore || parseInt(m.score)
        var list = m.list
        for(var k=0;k<list.length;k++){
          if (list[k] == food.id) {
            console.log(m.name)
            m.foodscore += 5
            break
          }
        }

      }
    }
    meal.sort(function (a, b) {
      return (a.foodscore || 0) - (b.foodscore || 0)
    })
    console.log(meal)
    for(var i=meal.length-1;i>meal.length-6;i--){
      swiperList.push(meal[i])
    }
    console.log(swiperList)
    this.setData({
      swiperList: swiperList
    })
  }
})