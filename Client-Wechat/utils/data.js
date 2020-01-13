export default {
  data: {
  },
  options: {
  },
  getFoodNum:function(){
    return 80;
  },
  getUrl: function () {
    return 'https://luckybugqqq.qicp.io/';
    //return 'http://192.168.1.104:5000/';
  },
  getScore:function(u) {
    var gender = u.gender
    var height = Number(u.height)
    console.log(height)
    var weight = u.weight
    var bmi = weight * 10000 / ((height + 100) * (height + 100))
    var fatrate = u.fatrate
    var xieya  = u.xieya
    var xietang = u.xietang
    var gxy = u.gxy
    var s1 = Math.abs(bmi-20.7)*0.2
    var s2 = Math.abs(fatrate - (gender?22.5:16.5)) * 0.2
    var s3 = Math.abs(xietang - 50) * 0.02
    var s4 = Math.abs(xieya[0] - 115) * 0.02 + Math.abs(xieya[1] - 75) * 0.02
    var s5 = u.gxy?1:0
    console.log(s1+' '+s2+' '+s3+' '+s4+' '+s5)
    var score = 9.9-s1-s2-s3-s4-s5;
    if(score<0.1){score=0.1}
    return score.toFixed(1)
  }

}