Page({
  data: {
    imgList: ['https://upload-images.jianshu.io/upload_images/3289907-2547dfa85b96cba5.jpg', 'https://upload-images.jianshu.io/upload_images/3289907-433aaa0d2515a241.jpg', 'https://upload-images.jianshu.io/upload_images/3289907-eee030b881e6c80a.jpg'],
    imgList1: ['https://upload-images.jianshu.io/upload_images/10402588-5a42e1b406798c29.jpg', 'https://upload-images.jianshu.io/upload_images/10402588-934414e85ea997b0.jpg', 'https://upload-images.jianshu.io/upload_images/10402588-03429106bb9c9c36.jpg'],
    imgList2: ['http://i2.chuimg.com/e4878160880511e6a9a10242ac110002_620w_413h.jpg?imageView2/2/w/660/interlace/1/q/90', 'http://i2.chuimg.com/d4890aa288b111e6b87c0242ac110003_640w_640h.jpg?imageView2/2/w/660/interlace/1/q/90', 'http://i2.chuimg.com/581c7acc88d311e6b87c0242ac110003_640w_424h.jpg?imageView2/2/w/660/interlace/1/q/90'],
    hasList:true,
    TabCur: 0,
    TabCur0:0,
    TabCur1: 0,
    scrollLeft: 0,
    TabList00: ['community', 'shop'],
    TabList0:['社区','商城'],
    TabList1: ['食谱推荐','日记本','我的'],
    TabList:['营养餐厅','菜市场','外送服务','微商城'],
    carts:[],
    carts1: [{ 'name': '柒月粉（同济店）', 'average': '20元/人', 'distance': '554m', 'location': '控江地区', 'feature': '健身餐，孕妇餐，减肥餐', 'star': 5, 'image':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564992696619&di=73933ed97e1cb66ea20b27d0f401faba&imgtype=0&src=http%3A%2F%2Fqcloud.dpfile.com%2Fpc%2FcGVmkAArMGzze9Ff_TdQmSsRym5nQV74_uskvaHyQWz6_IBDXdDnM3uwReoRrOrtTK-l1dfmC-sNXFHV2eRvcw.jpg' },
      { 'name': '东北人家', 'average': '35元/人', 'distance': '350m', 'location': '五角场', 'feature': '健身餐，减肥餐', 'star': 5, 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564992760316&di=25585594063e46205de3454cc69f60f5&imgtype=0&src=http%3A%2F%2Fqcloud.dpfile.com%2Fpc%2F6howIjVCBq8Em9iQ4OURV3q3AlrCWeBag5SFs0ZcWmpVf2mOaibdFN16t_pSyHCpTK-l1dfmC-sNXFHV2eRvcw.jpg' },
      { 'name': '奢曰 印象小馆（密云店）', 'average': '15元/人', 'distance': '980m', 'location': '曲阳地区', 'feature': '减肥餐', 'star': 4, 'image':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564992801024&di=9ce70323d15cbd9afaa2230bdaa05c8b&imgtype=0&src=http%3A%2F%2Fqcloud.dpfile.com%2Fpc%2Fk2NPzTuMAB9nOsaqP9zKBt9uKoBp0oJq9SJBighok3_MyPRMleaDSP-6WmQuJiv6joJrvItByyS4HHaWdXyO_DrXIaWutJls2xCVbatkhjUNNiIYVnHvzugZCuBITtvjski7YaLlHpkrQUr5euoQrg.jpg' },
      { 'name': '同济大排档', 'average': '15/人', 'star': 5, 'distance': '480m', 'location': '五角场', 'feature': '健身餐，减肥餐', 'image':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565587528&di=c75dd41cc375623514c49c4565b47ade&imgtype=jpg&er=1&src=http%3A%2F%2Fphoto.eastday.com%2Fimages%2Fthumbnailimg%2Fmonth_1604%2F201604241022312711.jpg' },
      { 'name': '刘记肉夹馍', 'average': '15/人', 'distance': '485m', 'location': '五角场', 'feature': '健身餐', 'star': 1, 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564992857800&di=48887cedb26d40897edfbc267e28e5bb&imgtype=0&src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Fsmccloud%2F2015%2F04%2F30%2F143036071892710846.JPG'},
      { 'name': '西湘', 'average': '25/人', 'distance': '685m', 'location': '控江地区', 'feature': '孕妇餐，减肥餐', 'star': 3, 'image': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3675945945,3754614252&fm=15&gp=0.jpg' },
      ],
    carts2: [{ 'name': '密云菜市场', 'star': 4, 'distance': '200m', 'location': '曲阳地区', 'cost': '30元起送', 'image':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564992914475&di=e7b80e11122ddacc430159c01f99e856&imgtype=0&src=http%3A%2F%2Fimg4.agronet.com.cn%2FUsers%2F100%2F587%2F700%2F20179291445106155.jpg'},
      {
        'name': '汇百佳生鲜（鞍山生鲜旗舰店）', 'star': 5, 'distance': '250m', 'location': '五角场', 'cost': '30元起送', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564992944380&di=bd714284fe58410df81771a2851f4f6f&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181220%2Fbc6a6fa167404d458d8dcc11a1570b89.jpeg' },
      { 'name': '邮电菜市场', 'star': 3, 'distance': '500m', 'location': '邮电新村', 'cost': '30元起送', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562320471502&di=b0e5ca16074561234efa4691358a6832&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20120519%2FImg343594616.jpg' },
      { 'name': '王小菜（曲阳菜市场门店）', 'star': 4, 'distance': '2km', 'location': '控江地区', 'cost': '30元起送', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562320471502&di=cef23e487eb16c29e075290aab5c70df&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20111226%2FImg330285644.jpg' },
      { 'name': '上海祥德莱菜市场', 'star': 3, 'distance': '75m', 'location': '曲阳地区', 'cost': '30元起送', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564993019600&di=859018b75167745abf65f9d5c6b1bad3&imgtype=0&src=http%3A%2F%2Fwww.gov.cn%2Fjrzg%2Fimages%2Fimages%2F001e3741a4060f346de503.jpg' },
      { 'name': '阳普长岭菜市场', 'star': 2, 'distance': '3.8km', 'location': '曲阳地区', 'cost': '30元起送', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565587750&di=5276ac246c56a94398d0b35d81aaeb93&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170308%2Fdaed08969a2f421e8cd41965a6523e39_th.jpeg' }],
    carts4: [{ 'name': '智能手环', 'star':'78','price': '350', 'image':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562320529923&di=bf92c352f98058c52c583f5df46fe56f&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ2OTE5ODcyNDE2Ny0zMTg4ODMyOQ%3D%3D.jpg'},
      { 'name': '智能体脂称', 'star': '56','price': '250', 'image':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562320552587&di=66c1d273da798abad1166a64bc147748&imgtype=0&src=http%3A%2F%2Fupload.iheima.com%2F2017%2F0322%2F1490164104198.jpg'},
      { 'name': '肌肉小王子鸡胸肉', 'star': '38','price': '50', 'image': 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1114138185,1136161865&fm=26&gp=0.jpg' },
      { 'name': '血糖仪', 'star': '22','price': '800', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562320607910&di=2f913907fc14b6b7c927e3ed65418693&imgtype=0&src=http%3A%2F%2Fwww.yp900.com%2Fuploadimages%2Ffenlei%2F2016121515552873.jpg'},
      { 'name': '全麦面包', 'star': '99', 'price': '20', 'image': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3446490504,2491706871&fm=26&gp=0.jpg'},
      { 'name': '体脂仪', 'star': '30', 'price': '480', 'image': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562926379&di=54fe96cce2ecca7de375c00c95f9175d&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fcommodity_story%2Fmedium%2Fpublic%2Fp12043717.jpg' },]
  },
  onLoad() {
    var carts1 = this.data.carts1
    this.setData({
      carts:carts1
    })
  },
  tabSelect(e) {
    var id = e.currentTarget.dataset.id
    var carts = []
    if (id == 0) { carts = this.data.carts1 }
    if (id == 1) { carts = this.data.carts2 }
    if (id == 2) { carts = this.data.carts1 }
    if (id == 3) { carts = this.data.carts4 }
    this.setData({
      carts:carts,
      TabCur: id,
    })
  },
  tabSelect0(e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      TabCur0: id,
    })
  },
  tabSelect1(e) {
    var id = e.currentTarget.dataset.id
    this.setData({
      TabCur1: id,
    })
  }
})