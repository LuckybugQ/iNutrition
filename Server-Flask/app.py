from flask import Response,Flask,request
from methods import init_Food,init_Meal,to_Data, to_Json, get_Image,get_AllImage,get_Score
from personal_recommend import CF_Algorithm,user_test
from baidu import imageclassify
from cal_score import cal_score
#list = [1,3,7,9,28,38,43,15,42,14,22,30,46,51,53,58,68,69,72,75,85,86,87,88,89,90,91,96,97,99,98,101,102,103,106,108,110]
list = []
mealdata = [{'name': '土豆烧牛肉', 'list': [65, 65, 65, 14, 38], 'cata': 'lunch'},
            {'name': '番茄炒蛋', 'list': [78, 78, 35, 35, 35, 35], 'cata': 'lunch'},
            {'name': '麻婆豆腐', 'list': [4, 4, 4, 4, 19], 'cata': 'lunch'},
            {'name': '宫保鸡丁', 'list': [8, 67, 67], 'cata': 'lunch'},
            {'name': '糖醋排骨', 'list': [63, 63, 63, 63], 'cata': 'lunch'},
            {'name': '酸辣土豆丝', 'list': [14, 14, 19], 'cata': 'lunch,vegetarian'},
            {'name': '地三鲜', 'list': [14, 14, 18, 18, 19, 19], 'cata': 'lunch,vegetarian'},
            {'name': '蛋炒饭', 'list': [78, 0], 'cata': 'lunch,dinner'},
            {'name': '小笼包', 'list': [2, 63], 'cata': 'breakfast'},
            {'name': '重庆小面', 'list': [2, 19], 'cata': 'breakfast,dinner,noodle'},
            {'name': '全麦面包', 'list': [2], 'cata': 'breakfast,keep'},
            {'name': '牛肉汉堡', 'list': [2, 65], 'cata': 'breakfast,dinner'},
            {'name': '皮蛋瘦肉粥', 'list': [12, 63, 78], 'cata': 'breakfast'},
            {'name': '水果燕麦粥', 'list': [12, 13, 57], 'cata': 'breakfast,keep,vegetarian'},
            {'name': '意大利面', 'list': [2, 35], 'cata': 'breakfast,noodle'},
            {'name': '水果沙拉', 'list': [57, 58, 59], 'cata': 'breakfast,dinner,keep,vegetarian'},
            {'name': '香煎牛排', 'list': [65, 65], 'cata': 'dinner,keep'},
            {'name': '炸酱面', 'list': [2, 43, 44], 'cata': 'dinner,noodle'},
            {'name': '豚骨拉面', 'list': [2, 43, 20], 'cata': 'dinner,noodle'},
            {'name': '柠檬鸡胸', 'list': [59, 67, 67], 'cata': 'dinner,keep'},
            {'name': '白灼西兰花', 'list': [40, 40], 'cata': 'lunch,dinner,vegetarian'},
            {'name': '开水白菜', 'list': [16, 16], 'cata': 'lunch,dinner,vegetarian'},
            {'name': '凉拌萝卜丝', 'list': [30, 30], 'cata': 'lunch,dinner,vegetarian'},
            {'name': '生煎金枪鱼', 'list': [70, 70, 70], 'cata': 'dinner,keep'},
            {'name': '荞麦面', 'list': [1, 2, 3], 'cata': 'breakfast,dinner,noodle,keep'},
            {'name': '薯条', 'list': [66,67], 'cata': 'snack'},
            {'name': '冰激凌', 'list': [65,66], 'cata': 'snack'},
            {'name': '巧克力', 'list': [65], 'cata': 'snack'},
            {'name': '棒棒糖', 'list': [66], 'cata': 'snack'},
            {'name': '威化饼干', 'list': [67,68], 'cata': 'snack'},
            {'name': '双皮奶', 'list': [68], 'cata': 'snack'},
            {'name': '牛肉干', 'list': [69], 'cata': 'snack'},
            {'name': '炸鸡腿', 'list': [79], 'cata': 'snack'},
            {'name': '三黄油鸡', 'list': [67, 25, 17], 'cata': 'lunch,dinner,shanghai'},
            {'name': '丝瓜炒小鲜', 'list': [21, 24, 17], 'cata': 'breakfast,dinner,shanghai'},
            {'name': '乳香四季豆', 'list': [37, 24, 77], 'cata': 'lunch,dinner,shanghai'},
            {'name': '冰糟鳕鱼冻', 'list': [70, 59, 17], 'cata': 'lunch,dinner,shanghai'},
            {'name': '凤吞花菇', 'list': [67, 24, 17], 'cata': 'lunch,dinner,shanghai'},
            {'name': '凤尾明虾', 'list': [67, 75, 76], 'cata': 'lunch,dinner,shanghai'},
            {'name': '沪式炒素虾仁', 'list': [75, 25, 17], 'cata': 'lunch,dinner,shanghai'}
            ]


app = Flask(__name__)
staticFood = init_Food()
staticMeal = init_Meal(staticFood,mealdata)
Meal = staticMeal
Meal = get_AllImage(staticMeal,list)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/meal', methods = ['POST']) # 返回分数
def get_meal():
    data = to_Data()
    meal = Meal
    u = data['user']
    print(u);
    i = 0
    food_score = cal_score(u);  # 80种食物的评分，列表存储，有序
    print(food_score)
    for m in meal:
        if(i>=80):
            m['score'] = get_Score(m,u,meal)
        else:
            m['score'] = food_score[i]
        i = i + 1
        if 'snack' in m['cata']:
            s=float(m['score'])/2
            m['score']='%.1f' % s
    print(meal);
    data = to_Json(meal)
    return data



@app.route('/score', methods = ['POST']) # 返回分数
def get_score():
    data = to_Data()
    meal = data['meal']
    u = data['user']
    all = data['all']
    print(u);
    i = 0
    food_score = cal_score(u);  # 80种食物的评分，列表存储，有序
    print(food_score)
    for m in meal:
        if(i>=80):
            m['score'] = get_Score(m,u,all)
        else:
            m['score'] = food_score[i]
        i = i + 1
        if 'snack' in m['cata']:
            s=float(m['score'])/2
            m['score']='%.1f' % s
    data = to_Json(meal)
    print(meal);
    return data

@app.route('/searchImage', methods = ['POST'])
def search_Image():
    data = to_Data()
    name = data['name']
    number = data['number']
    print(number)
    url = get_Image(name,number,False)
    print(url)
    data = to_Json(url)
    return data

@app.route('/classifyImage', methods = ['POST'])
def clasiify_Image():
    print('开始识别！')
    data = request.files['image']
    image = data.read()
    result =imageclassify(image)
    id = -1;
    for i in range(len(staticFood)):
        m = staticFood[i]['name']
        if(m==result):
            id=i
            print('食材id：',i)
            break
    data= to_Json(id)
    return data


@app.route('/recommend', methods = ['POST'])
def recommend():
    data = to_Data()
    #area = data['area']
    #user= data['user']
    result = CF_Algorithm(user_test,'shanghai')
    data = to_Json(result)
    print('recommend!')
    print(data)
    return data

@app.route("/image/<imageid>")
def index(imageid):
    img_path = open("images/{}.jpg".format(imageid),'rb')
    resp = Response(img_path, mimetype="image/jpg")
    return resp

if __name__ == '__main__':

    app.run(host = '0.0.0.0',port = 5000)


