import Data from '/data.js'

export default {
  data: {
  },
  options: {

  },
  init: function (e) {
    var user =  {
        'gender': 0,
        'height': 75,
        'weight': 60,
        'fatrate':17,
        'birthday': "1996-08-03",
        'place': ["四川省", "成都市", "郫都区"],
        'xieya':[115, 75],
        'xietang':50,
        'tnb': false,
        'gxy': false,
        'sports':1
    }
    wx.setStorageSync('user', user)
    
    var that=this
    wx.request({
      url: Data.getUrl()+'meal',
      data: {
        'user':user,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log('后台读取数据成功')
        console.log(res.data)
        var meal = res.data;
        meal = that.setAllMealInfo(meal);
        if (e) {
          console.log('加入build中数据');
          var build = wx.getStorageSync('build') || []
          for (var i = 0; i < build.length; i++) {
            meal.push(build[i]);
          }
        }
        wx.setStorageSync('meal', meal)
      },
    })
  },
  setAllMealInfo: function (e) {
    var meal = e;
    var m = {};
    for (var i = 0; i < meal.length; i++) {
      m = meal[i];
      //meal[i].score = (Math.random() * 10).toFixed(1);//这个要和后台连接
      meal[i].quantity = 0;
      meal[i].amount = meal[i].amount || 100;
      meal[i].image = meal[i].image || Data.getUrl() +'image/'+ m.id;
      meal[i].eva = this.getEva(m.score);
      meal[i].color = this.getColor(m.score);
      meal[i].nutrition = meal[i].nutrition || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0,0,0]
    }
    return meal;
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
}