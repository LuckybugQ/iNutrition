// pages/help/help.js
Page({
  data: {
    memberList: [
      {
        cont: "如何使用iNutrition？",
        hiddena: true,
        id: "0",
        invalidActivty: [
          {help: "iNutrition很容易使用，您只需要在User-身体数据面板中输入您的个人信息和身体数据，就可以得到您的健康指数和为您订制的每种食材、膳食和零食的个性化评分。您可以选择我们预设的膳食或者自己制作膳食加入到食谱中，获得每日食谱的健康评分(0~10)。"
          },
        ]
      },
      {
        cont: "如何查找我想吃的食物？",
        hiddena: true,
        id: "1",
        invalidActivty: [
          {
            help: "在Search面板中选择食物的分类或者在上方的搜索框输入食物名称即可。食物栏以您的个性化评分进行排序。我们支持在不同的分类中查找食物。同时，我们为每个食物分类都加入了我们的推荐，可供您进行参考。",
          },
          ]
      },
      {
        cont: "如何查看膳食的详细信息？",
        hiddena: true,
        id: "2",
        invalidActivty: [
          {
            help: "点击膳食图片即可跳转到膳食详情面板中。在膳食详情面板中，你可以将其加入或移除今日食谱。此外，在食材的详情面板中，你可以跳转到制作膳食界面，系统将为您将要制作的膳食添加一份该项食材。",
          },
        ]
      },
      {
        cont: "如何制作自定义的膳食？",
        hiddena: true,
        id: "3",
        invalidActivty: [
          {
            help: "在Build面板中点击[+ 制作膳食]按钮，选择食材的种类和数量，以及膳食的烹饪方式，即可制作属于你的膳食，系统会自动给出它的健康评分。你也可以在食材栏优化点击[+]按钮或者在食材的详情面板选择[+ 制作膳食]，系统会为你跳转到制作膳食界面，并为您将要制作的膳食添加一份该项食材。",
          },
        ]
      },
      {
        cont: "如何将膳食加入到每日食谱中？",
        hiddena: true,
        id: "4",
        invalidActivty: [
          {
            help: "在膳食栏向左滑动，点击[+]按钮即可。或者点击膳食图片进入膳食的详情界面，点击[+ 加入今日食谱]即可。您也可以点击[- 移除今日食谱]或在Diary面板中点击[x]按钮来从今日食谱中删除此膳食。",
          },
        ]
      },
      {
        cont: "如何为当天的食谱打卡？",
        hiddena: true,
        id: "5",
        invalidActivty: [
          {
            help: "在Diary面板中，点击打卡按钮，即可将当天的食谱和评分保存到打卡记录中。我们设置的是当日食谱的健康评分达到5分后，才会开放打卡按钮。在User-打卡记录面板中，你可以直观地看到你的打卡情况和食谱记录，以及健康指数的变化情况。",
          },
        ]
      },

      

  ]},
  isOpen: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    var memberList = that.data.memberList;
    console.log(memberList);
    for (let i = 0; i < memberList.length; i++) {
      if (idx == i) {
        memberList[i].hiddena = !memberList[i].hiddena;
      } else {
        memberList[i].hiddena = true;
      }
    }
    this.setData({ memberList: memberList });
    return true;
  },

})