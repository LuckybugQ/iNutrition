from typing import Any, Union

from flask import request
import json,random
import re,requests,os
import xlrd
import linecache
import array


def to_Data():
    # data = request.get_data()  # 获取前端数据
    # data = str(data, 'utf-8')  # 转utf-8
    # data = json.loads(data)  # json转字典
    data = json.loads(request.get_data().decode("utf-8"))
    if data:
        return data
    else:
        return {}

def to_Json(list = None):
    if list:
        data = json.dumps(list, ensure_ascii = False)
    else:
        data = "0"
    return data



def get_Image(name,number,write):
    url = "http://image.baidu.com/search/flip?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1460997499750_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word={}".format(name)
    html = requests.get(url).text
    pic_url = re.findall('"objURL":"(.*?)",', html, re.S)
    file = open("imageurl.txt", "a")
    i = 0
    for each in pic_url:
        if(i<number):
            i=i+1
            continue
        try:
            pic = requests.get(each, timeout=1)
        except:
            print('当前图片无法下载')
        else:
            print(each)
            if(i >= number):
                if(write):
                    file.write(name + '\n')
                    file.write(each + '\n')
                    file.close()
                return each
            i = i + 1


def download_Image(name,number,id):
    url = "http://image.baidu.com/search/flip?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1460997499750_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word={}".format(name)

    html = requests.get(url).text

    image_path = os.path.join(os.path.dirname(__file__), "images/download")

    pic_url = re.findall('"objURL":"(.*?)",', html, re.S)

    if not os.path.exists(image_path):
        os.makedirs(image_path)

    i = 0
    for each in pic_url:
        file_name = image_path + '/' + str(id) + '.jpg'
        print(each)
        try:
            pic = requests.get(each, timeout=10)
        except:
            print('当前图片无法下载')
            continue
        if(i==number):
            return 0
        f = open(file_name, 'wb')
        f.write(pic.content)
        f.close()
        i += 1

def init_Food():
    # 打开文件
    meal=[]
    workbook = xlrd.open_workbook(r'list.xlsx')
    sheet = workbook.sheet_by_index(0)  # sheet索引从0开始
    # 获取单元格内容
    for i in range(0,80):
        v=['','','','','','','','','','','','','','','','','']
        for j in range(0,17):
            v[j]=sheet.cell(i, j).value
            if(v[j]==''):
                v[j] = 0
        if(i>=0 and i<=13):
            cata='food,grain'
        if(i>=14 and i<=45):
            cata='food,vegetable'
        if(i>=46 and i<=62):
            cata='food,fruit'
        if(i>=63 and i<=79):
            cata='food,meat'
        #download_Image(v[0],1,i)
        m = dict(id=i,name=v[0], cal=v[16], nutrition=[v[1],v[2],v[3],v[14],v[15],v[4],v[8],v[9],v[6],v[5],v[7],v[10],v[11],v[12],v[13]],cata=cata)
        meal.append(m)
    print(meal)
    return(meal)

def init_Meal(food,mealdata):

    for i in range(0,len(mealdata)):
        m=get_Meal(mealdata[i],food)
        print(m)
        food.append(m)
    return food

def get_Meal(m,food):
    cal=0
    nutrition=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for i in m['list']:
        cal+=food[i]['cal']
        if(food[i]['id']>=105):
            cal*=5
        cal = round(cal, 1)
        for j in range(0,15):
            nutrition[j]+=food[i]['nutrition'][j]
            nutrition[j]=round(nutrition[j],2)
    m=dict(id=len(food),name=m['name'],cal=cal,nutrition=nutrition,cata='meal,'+m['cata'],list=m['list'])
    return m

def get_AllImage(meal,list):
    for m in meal:
        name = m['name']
        #url = get_Image(name, 0, True)
        url = linecache.getline('imageurl.txt', (m['id']+1)*2)
        m['image']=url
    for i in list:
        #name = meal[i]['name']
        #download_Image(name, 1, i)
        id = str(meal[i]['id'])
        meal[i]['image'] = 'https://luckybugqqq.qicp.io/image/' + id;
    return meal


def get_Score(m,u,meal):
    if(m['id']>=80):
        s = 0
        for i in m['list']:
            s += float(meal[i]['score'])
        s /= len(m['list'])
    else:
        cal=float(m['cal'])
        nutrition=list(map(float,m['nutrition']))
        gender=u['gender']
        fatrate=float(u['fatrate'])
        age=u['birthday']
        height=int(u['height'])+100
        weight=int(u['weight'])
        bmi=float(weight)/float(height*height)
        xieya=u['xieya'][0]+u['xieya'][1]
        xietang=u['xietang']
        mental=u['tnb']
        s1=cal*(bmi+fatrate)
        s2=0
        index=[1,10,-10,200,-1,5,50,5,10,10,1,1,10,0.1,10]
        for i in range(0,14):
            s2+=float(nutrition[i])*index[i]
        s= round((s2*1.5-s1+10000)/20000*10,1)
        if(s>9.9):
            s=9.9
        if(s<0.1):
            s=0.1
        #print( str(s))
    return '%.1f' %s