'''
个人偏好+推荐系统
（1） 输入用户和对应饮食记录  输入用户位置
（2） 匹配菜谱
（3） 评分排序  属于用户位置的菜谱加分
'''
from math import sqrt
#地域推荐系统
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
            {'name': '三黄油鸡', 'list': [68, 25, 18], 'cata': 'lunch,dinner,shanghai'},
            {'name': '丝瓜炒小鲜', 'list': [22, 25, 18], 'cata': 'breakfast,dinner,shanghai'},
            {'name': '乳香四季豆', 'list': [38, 25, 78], 'cata': 'lunch,dinner,shanghai'},
            {'name': '冰糟鳕鱼冻', 'list': [71, 60, 18], 'cata': 'lunch,dinner,shanghai'},
            {'name': '凤吞花菇', 'list': [68, 25, 18], 'cata': 'lunch,dinner,shanghai'},
            {'name': '凤尾明虾', 'list': [68, 76, 77], 'cata': 'lunch,dinner,shanghai'},
            {'name': '沪式炒素虾仁', 'list': [76, 25, 18], 'cata': 'lunch,dinner,shanghai'}
            ]

#前端获取的用户饮食数据
user_test =[{'id': 0, 'frequency': 2},
            {'id': 1, 'frequency': 2},
            {'id': 2, 'frequency': 0},
            {'id': 3, 'frequency': 1},
            {'id': 4, 'frequency': 0},
            {'id': 5, 'frequency': 0},
            {'id': 6, 'frequency': 0},
            {'id': 7, 'frequency': 0},
            {'id': 8, 'frequency': 0},
            {'id': 9, 'frequency': 3},
            {'id': 10, 'frequency': 2},
            {'id': 11, 'frequency': 1},
            {'id': 12, 'frequency': 0},
            {'id': 13, 'frequency': 0},
            {'id': 14, 'frequency': 0},
            {'id': 15, 'frequency': 0},
            {'id': 16, 'frequency': 0},
            {'id': 17, 'frequency': 0},
            {'id': 18, 'frequency': 0},
            {'id': 19, 'frequency': 0},
            {'id': 20, 'frequency': 0},
            {'id': 21, 'frequency': 0},
            {'id': 22, 'frequency': 0},
            {'id': 23, 'frequency': 0},
            {'id': 24, 'frequency': 0},
            {'id': 25, 'frequency': 0},
            {'id': 26, 'frequency': 0},
            {'id': 27, 'frequency': 0},
            {'id': 28, 'frequency': 0},
            {'id': 29, 'frequency': 0},
            {'id': 30, 'frequency': 0},
            {'id': 31, 'frequency': 0},
            {'id': 32, 'frequency': 0},
            {'id': 33, 'frequency': 0},
            {'id': 34, 'frequency': 0},
            {'id': 35, 'frequency': 0},
            {'id': 36, 'frequency': 0},
            {'id': 37, 'frequency': 0},
            {'id': 38, 'frequency': 0},
            {'id': 39, 'frequency': 0},]
#已有用户饮食记录
user_001 = [{'id': 0, 'frequency': 2},
            {'id': 1, 'frequency': 2},
            {'id': 2, 'frequency': 1},
            {'id': 3, 'frequency': 1},
            {'id': 4, 'frequency': 0},
            {'id': 5, 'frequency': 1},
            {'id': 6, 'frequency': 0},
            {'id': 7, 'frequency': 1},
            {'id': 8, 'frequency': 0},
            {'id': 9, 'frequency': 0},
            {'id': 10, 'frequency': 0},
            {'id': 11, 'frequency': 0},
            {'id': 12, 'frequency': 0},
            {'id': 13, 'frequency': 0},
            {'id': 14, 'frequency': 0},
            {'id': 15, 'frequency': 0},
            {'id': 16, 'frequency': 0},
            {'id': 17, 'frequency': 0},
            {'id': 18, 'frequency': 0},
            {'id': 19, 'frequency': 1},
            {'id': 20, 'frequency': 0},
            {'id': 21, 'frequency': 0},
            {'id': 22, 'frequency': 0},
            {'id': 23, 'frequency': 0},
            {'id': 24, 'frequency': 0},
            {'id': 25, 'frequency': 0},
            {'id': 26, 'frequency': 0},
            {'id': 27, 'frequency': 0},
            {'id': 28, 'frequency': 0},
            {'id': 29, 'frequency': 0},
            {'id': 30, 'frequency': 0},
            {'id': 31, 'frequency': 0},
            {'id': 32, 'frequency': 0},
            {'id': 33, 'frequency': 0},
            {'id': 34, 'frequency': 0},
            {'id': 35, 'frequency': 0},
            {'id': 36, 'frequency': 0},
            {'id': 37, 'frequency': 0},
            {'id': 38, 'frequency': 0},
            {'id': 39, 'frequency': 0}, ]
user_002 = [{'id': 0, 'frequency': 1},
            {'id': 1, 'frequency': 0},
            {'id': 2, 'frequency': 0},
            {'id': 3, 'frequency': 0},
            {'id': 4, 'frequency': 0},
            {'id': 5, 'frequency': 0},
            {'id': 6, 'frequency': 1},
            {'id': 7, 'frequency': 2},
            {'id': 8, 'frequency': 0},
            {'id': 9, 'frequency': 1},
            {'id': 10, 'frequency': 0},
            {'id': 11, 'frequency': 0},
            {'id': 12, 'frequency': 1},
            {'id': 13, 'frequency': 0},
            {'id': 14, 'frequency': 0},
            {'id': 15, 'frequency': 0},
            {'id': 16, 'frequency': 0},
            {'id': 17, 'frequency': 0},
            {'id': 18, 'frequency': 0},
            {'id': 19, 'frequency': 0},
            {'id': 20, 'frequency': 0},
            {'id': 21, 'frequency': 0},
            {'id': 22, 'frequency': 0},
            {'id': 23, 'frequency': 0},
            {'id': 24, 'frequency': 0},
            {'id': 25, 'frequency': 0},
            {'id': 26, 'frequency': 0},
            {'id': 27, 'frequency': 0},
            {'id': 28, 'frequency': 0},
            {'id': 29, 'frequency': 0},
            {'id': 30, 'frequency': 0},
            {'id': 31, 'frequency': 0},
            {'id': 32, 'frequency': 0},
            {'id': 33, 'frequency': 0},
            {'id': 34, 'frequency': 0},
            {'id': 35, 'frequency': 0},
            {'id': 36, 'frequency': 0},
            {'id': 37, 'frequency': 0},
            {'id': 38, 'frequency': 0},
            {'id': 39, 'frequency': 0},
            ]
user_003 = [{'id': 0, 'frequency': 0},
            {'id': 1, 'frequency': 0},
            {'id': 2, 'frequency': 0},
            {'id': 3, 'frequency': 1},
            {'id': 4, 'frequency': 0},
            {'id': 5, 'frequency': 1},
            {'id': 6, 'frequency': 0},
            {'id': 7, 'frequency': 0},
            {'id': 8, 'frequency': 1},
            {'id': 9, 'frequency': 0},
            {'id': 10, 'frequency': 0},
            {'id': 11, 'frequency': 0},
            {'id': 12, 'frequency': 0},
            {'id': 13, 'frequency': 0},
            {'id': 14, 'frequency': 0},
            {'id': 15, 'frequency': 0},
            {'id': 16, 'frequency': 0},
            {'id': 17, 'frequency': 0},
            {'id': 18, 'frequency': 2},
            {'id': 19, 'frequency': 0},
            {'id': 20, 'frequency': 0},
            {'id': 21, 'frequency': 0},
            {'id': 22, 'frequency': 0},
            {'id': 23, 'frequency': 0},
            {'id': 24, 'frequency': 0},
            {'id': 25, 'frequency': 0},
            {'id': 26, 'frequency': 0},
            {'id': 27, 'frequency': 0},
            {'id': 28, 'frequency': 0},
            {'id': 29, 'frequency': 0},
            {'id': 30, 'frequency': 0},
            {'id': 31, 'frequency': 0},
            {'id': 32, 'frequency': 0},
            {'id': 33, 'frequency': 0},
            {'id': 34, 'frequency': 0},
            {'id': 35, 'frequency': 0},
            {'id': 36, 'frequency': 0},
            {'id': 37, 'frequency': 0},
            {'id': 38, 'frequency': 0},
            {'id': 39, 'frequency': 0},
            ]
user_004 = [{'id': 0, 'frequency': 0},
            {'id': 1, 'frequency': 0},
            {'id': 2, 'frequency': 0},
            {'id': 3, 'frequency': 0},
            {'id': 4, 'frequency': 0},
            {'id': 5, 'frequency': 0},
            {'id': 6, 'frequency': 0},
            {'id': 7, 'frequency': 0},
            {'id': 8, 'frequency': 0},
            {'id': 9, 'frequency': 3},
            {'id': 10, 'frequency': 1},
            {'id': 11, 'frequency': 1},
            {'id': 12, 'frequency': 0},
            {'id': 13, 'frequency': 0},
            {'id': 14, 'frequency': 0},
            {'id': 15, 'frequency': 0},
            {'id': 16, 'frequency': 0},
            {'id': 17, 'frequency': 0},
            {'id': 18, 'frequency': 0},
            {'id': 19, 'frequency': 0},
            {'id': 20, 'frequency': 0},
            {'id': 21, 'frequency': 0},
            {'id': 22, 'frequency': 0},
            {'id': 23, 'frequency': 0},
            {'id': 24, 'frequency': 0},
            {'id': 25, 'frequency': 0},
            {'id': 26, 'frequency': 0},
            {'id': 27, 'frequency': 0},
            {'id': 28, 'frequency': 0},
            {'id': 29, 'frequency': 0},
            {'id': 30, 'frequency': 0},
            {'id': 31, 'frequency': 0},
            {'id': 32, 'frequency': 0},
            {'id': 33, 'frequency': 0},
            {'id': 34, 'frequency': 0},
            {'id': 35, 'frequency': 0},
            {'id': 36, 'frequency': 0},
            {'id': 37, 'frequency': 0},
            {'id': 38, 'frequency': 0},
            {'id': 39, 'frequency': 0},
            ]

user_data = [user_001, user_002, user_003, user_004]




# #计算每个用户吃过的食物范数
def cal_norm(data):
    norm = 0;
    for i in range(len(data)):
        if(data[i]['frequency'] > 0):
            norm += 1
    return norm

#用户推荐系统 协同过滤
def CF_Algorithm(user_test, area):
    Wij = [] #存放用户相似度
    #计算用户相似度
    user_norm = cal_norm(user_test)
    for i in range(0,len(user_data)):
        wij = 0
        for j in range(0,len(user_data[i])):
            wij += user_data[i][j]['frequency']*user_test[j]['frequency']
        norm = cal_norm(user_data[i])
        wij = wij / sqrt(norm*user_norm)
        Wij.append(wij)
    print(Wij)
    #选取两个相似用户
    K = 2
    simi_Wij = []
    simi_index = []
    temp_Wij = Wij.copy();
    for i in range(0, K):
        if (i > 0 and max(temp_Wij) == simi_Wij[i - 1]):
            continue
        t = temp_Wij.index(max(temp_Wij))
        for j in range(0, len(Wij)):
            if(max(temp_Wij) == Wij[j]):
                simi_Wij.append(Wij[j])
                simi_index.append(j)
        del temp_Wij[t]


    #计算用户对食物感兴趣程度

    Pvi = [] #存放食物感兴趣程度
    for i in range(0,len(user_test)):
        pvi = 0
        for j in range(0, len(simi_index)):
            pvi += user_data[simi_index[j]][i]['frequency'] * simi_Wij[j]
        Pvi.append(pvi)

    #结合地域信息
    for i in range(0, len(mealdata)):
        if(mealdata[i]['cata'].find(area) > 0):
            Pvi[i] += 5 #相同地域加分
            print(i)

    L = 3 #推荐前三位食物
    temp_Pvi = Pvi.copy()
    recom_Pvi = []
    recom_index = []
    for i in range(0, L):
        t = temp_Pvi.index(max(temp_Pvi))
        if(i > 0 and max(temp_Pvi) == recom_Pvi[i - 1]):
            continue
        for j in range(0, len(Pvi)):
            if (max(temp_Pvi) == Pvi[j]):
                recom_Pvi.append(Pvi[j])
                recom_index.append(j)
        del temp_Pvi[t]
    print(recom_index)
    return recom_index


area = 'shanxi'
CF_Algorithm(user_test, area)