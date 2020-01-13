# coding:utf-8

from aip import AipImageClassify

""" 这里输入你创建应用获得的三个参数"""
APP_ID = '16862212'
API_KEY = 'EZQG0mMgFiCb14v0KSUvLarS'
SECRET_KEY = 'O0ayDsTgdPXIdAr48Ost18dtf3bTc1PM'

client = AipImageClassify(APP_ID, API_KEY, SECRET_KEY)

""" 读取图片 """


def get_file_content(filePath):
    with open(filePath, 'rb') as fp:
        return fp.read()

def imageclassify(image):
    #path='images/98.jpg'
    #image = get_file_content(path)
    r = client.advancedGeneral(image);
    print(r);
    result =  r['result'][0]['keyword']
    print(result)
    return(result)


""" 调用通用物体识别 """
#imageclassify('')
