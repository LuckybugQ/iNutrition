#进行直接载入模型，然后给出该模型下对每种食材的评分
import lightgbm as lgb
from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn import metrics
unit = pd.read_csv("100unit.csv") #每种食物100g的矩阵


#body = 读取人的身体数据，然后开始分类。这里的body是一个字典类型
body = {'sex':1,
		'age':44,
		'gaoxueya':0,
		'tangniaobing':1,
		'HEIGHT':168,
		'WEIGHT':58,
		'YTB':1,
		'STJ':12,
		'SBW':23
		}#一个示例

### 读取模型
model_all = lgb.Booster(model_file='all.txt')#总的所有人的数据训练的模型
model_age11 = lgb.Booster(model_file='age11-18.txt')#按年龄分类
model_age19 = lgb.Booster(model_file='age19-28.txt')
model_age29 = lgb.Booster(model_file='age29-38.txt')
model_age39 = lgb.Booster(model_file='age39-48.txt')
model_age49 = lgb.Booster(model_file='age49-58.txt')
model_age59 = lgb.Booster(model_file='age59-68.txt')
model_age69 = lgb.Booster(model_file='age69-78.txt')
model_age79 = lgb.Booster(model_file='age79-100.txt')
model_gaoxueya0 = lgb.Booster(model_file='gaoxueya0.txt')#按高血压情况
model_gaoxueya1 = lgb.Booster(model_file='gaoxueya1.txt')
model_tangniaobing0 = lgb.Booster(model_file='tangniaobing0.txt')#按糖尿病情况
model_tangniaobing1 = lgb.Booster(model_file='tangniaobing1.txt')
model_sex1 = lgb.Booster(model_file='sex1.txt')#按性别
model_sex2 = lgb.Booster(model_file='sex2.txt')
model_BMIFP = lgb.Booster(model_file='BMIFP.txt')#按BMI-FP肥胖，GZ过重，PS偏瘦，ZC正常
model_BMIGZ = lgb.Booster(model_file='BMIGZ.txt')
model_BMIPS = lgb.Booster(model_file='BMIPS.txt')
model_BMIZC = lgb.Booster(model_file='BMIZC.txt')
model_SBWBZC = lgb.Booster(model_file='SBWBZC.txt')#按上臂围分类，正常与不正常
model_SBWZC = lgb.Booster(model_file='SBWZC.txt')
model_STJFP = lgb.Booster(model_file='STJFP.txt')#按三角肌分类，有肥胖，消瘦，正常
model_STJXS = lgb.Booster(model_file='STJXS.txt')
model_STJZC = lgb.Booster(model_file='STJZC.txt')
model_YTBFP = lgb.Booster(model_file='YTBFP.txt')#按腰臀比分类，肥胖和正常
model_YTBZC = lgb.Booster(model_file='YTBZC.txt')


food_score_all=model_all.predict(unit)


###开始给人分类，并且取得对应模型下的评分
# model_sex_score是基于性别的评分列表，

if body['sex']==1:#是男性
	food_score_sex1=model_sex1.predict(unit)
	model_sex_score = food_score_sex1.tolist()
else :
	food_score_sex2=model_sex2.predict(unit)
	model_sex_score = food_score_sex2.tolist()
	
if body['age']<=18:
	food_score_age11=model_age11.predict(unit)
	model_age_score = food_score_age11.tolist()
elif body['age']<=28:
	food_score_age19=model_age19.predict(unit)
	model_age_score = food_score_age19.tolist()
elif body['age']<=38:
	food_score_age29=model_age29.predict(unit)
	model_age_score = food_score_age29.tolist()
elif body['age']<=48:
	food_score_age39=model_age39.predict(unit)
	model_age_score = food_score_age39.tolist()
elif body['age']<=58:
	food_score_age49=model_age49.predict(unit)
	model_age_score = food_score_age49.tolist()
elif body['age']<=68:
	food_score_age59=model_age59.predict(unit)
	model_age_score = food_score_age59.tolist()
elif body['age']<=78:
	food_score_age69=model_age69.predict(unit)
	model_age_score = food_score_age69.tolist()
else:
	food_score_age79=model_age79.predict(unit)
	model_age_score = food_score_age79.tolist()

if body['gaoxueya']==1:#有高血压
	food_score_gaoxueya1=model_gaoxueya1.predict(unit)
	model_gaoxueya_score = food_score_gaoxueya1.tolist()
else :
	food_score_gaoxueya0=model_gaoxueya0.predict(unit)
	model_gaoxueya_score = food_score_gaoxueya0.tolist()


if body['tangniaobing']==1:#有糖尿病
	food_score_tangniaobing1=model_tangniaobing1.predict(unit)
	model_tangniaobing_score = food_score_tangniaobing1.tolist()
else :
	food_score_tangniaobing0=model_tangniaobing0.predict(unit)
	model_tangniaobing_score = food_score_tangniaobing0.tolist()

body['BMI']=body['WEIGHT']/body['HEIGHT']/body['HEIGHT']*10000 #通过身高体重计算BMI

if body['BMI']<=18.4:
	food_score_BMIPS=model_BMIPS.predict(unit)
	model_BMI_score = food_score_BMIPS.tolist()
elif body['BMI']<=23.9:
	food_score_BMIZC=model_BMIZC.predict(unit)
	model_BMI_score = food_score_BMIZC.tolist()
elif body['BMI']<=27.9:
	food_score_BMIGZ=model_BMIGZ.predict(unit)
	model_BMI_score = food_score_BMIGZ.tolist()
else: 
	food_score_BMIFP=model_BMIFP.predict(unit)
	model_BMI_score = food_score_BMIFP.tolist()

if body['SBW']<=22.77 and body['sex']==1:#上臂围不正常
	food_score_SBWBZC = model_SBWBZC.predict(unit)
	model_SBW_score = food_score_SBWBZC.tolist()
elif body['SBW']<=20.88 and body['sex']==2:#不正常
	food_score_SBWBZC = model_SBWBZC.predict(unit)
	model_SBW_score = food_score_SBWBZC.tolist()
else:#其余情况，包括没有输入时，默认正常
	food_score_SBWZC = model_SBWZC.predict(unit)
	model_SBW_score = food_score_SBWZC.tolist()

if body['YTB']>0.9 and body['sex']==1:#腰臀比不正常
	food_score_YTBFP = model_YTBFP.predict(unit)
	model_YTB_score = food_score_YTBFP.tolist()
elif body['YTB']>0.8 and body['sex']==2:#腰臀比不正常
	food_score_YTBFP = model_YTBFP.predict(unit)
	model_YTB_score = food_score_YTBFP.tolist()
else:#其余情况，包括没有输入时，默认正常
	food_score_YTBZC = model_YTBZC.predict(unit)
	model_YTB_score = food_score_YTBZC.tolist()
	
if body['STJ']>15 and body['sex']==1:#男 三头肌肥胖
	food_score_STJFP = model_STJFP.predict(unit)
	model_STJ_score = food_score_STJFP.tolist()
elif body['STJ']>19.8 and body['sex']==2:#女 三头肌肥胖
	food_score_STJFP = model_STJFP.predict(unit)
	model_STJ_score = food_score_STJFP.tolist()
elif body['STJ']<10 and body['sex']==1:#男 三头肌消瘦
	food_score_STJXS = model_STJXS.predict(unit)
	model_STJ_score = food_score_STJXS.tolist()
elif body['STJ']<13.2 and body['sex']==2:#女 三头肌消瘦
	food_score_STJXS = model_STJXS.predict(unit)
	model_STJ_score = food_score_STJXS.tolist()
else :#其余情况，包括没有输入时，默认正常
	food_score_STJZC = model_STJZC.predict(unit)
	model_STJ_score = food_score_STJZC.tolist()

total_score=[]#预置一个列表，开始对各模型的分数进行加权求和
weight=(1/8,1/8,1/8,1/8,1/8,1/8,1/8,1/8,) #用一个元组来存各模型分数的权重，这里是均匀分布,分别是 sex age gaoxueya tangniaobing BMI SBW STJ YTB
for i in range(0,193):#这里可以选择是否将每个维度归一化,注意这样确实会导致食材总评分数发生变化进而排序不相同
	#score_i = weight[0]*model_sex_score[i]+weight[1]*model_age_score[i]+weight[2]*model_gaoxueya_score[i]+weight[3]*model_tangniaobing_score[i]+weight[4]*model_BMI_score[i]+weight[5]*model_SBW_score[i]+weight[6]*model_STJ_score[i]+weight[7]*model_YTB_score[i]
	score_i = weight[0]*(model_sex_score[i]-min(model_sex_score))/(max(model_sex_score)-min(model_sex_score))*100+weight[1]*(model_age_score[i]-min(model_age_score))/(max(model_age_score)-min(model_age_score))*100+weight[2]*(model_gaoxueya_score[i]-min(model_gaoxueya_score))/(max(model_gaoxueya_score)-min(model_gaoxueya_score))*100+weight[3]*(model_tangniaobing_score[i]-min(model_tangniaobing_score))/(max(model_tangniaobing_score)-min(model_tangniaobing_score))*100 + weight[4]*(model_BMI_score[i]-min(model_BMI_score))/(max(model_BMI_score)-min(model_BMI_score))*100+weight[5]*(model_SBW_score[i]-min(model_SBW_score))/(max(model_SBW_score)-min(model_SBW_score))*100+weight[6]*(model_STJ_score[i]-min(model_STJ_score))/(max(model_STJ_score)-min(model_STJ_score))*100+weight[7]*(model_YTB_score[i]-min(model_YTB_score))/(max(model_YTB_score)-min(model_YTB_score))*100
	total_score.append(score_i)
	
#接下来处理相同评分的食材，评分相同时，更小的食材代码优先
for i in range(0,193):
    total_score[i]=total_score[i]-i*0.000000000001
	
	
#食物列表
food_list=[111, 112, 113, 114, 115, 120, 121, 122, 123, 124, 131, 132, 141, 142, 
	151, 152, 190, 192, 211, 212, 213, 221, 222, 311, 312, 313, 314, 315, 321, 322, 
	331, 332, 341, 351, 352, 391, 392, 393, 411, 412, 413, 414, 421, 422, 431, 432, 
	441, 442, 443, 444, 445, 451, 452, 453, 454, 460, 471, 472, 473, 480, 510, 520, 
	611, 612, 613, 619, 621, 622, 623, 629, 631, 632, 633, 639, 641, 642, 643, 650, 
	661, 662, 710, 720, 811, 812, 813, 814, 821, 822, 823, 831, 832, 833, 841, 842, 
	843, 890, 911, 912, 913, 921, 922, 923, 931, 932, 933, 942, 943, 990, 1011, 1012, 
	1013, 1021, 1022, 1030, 1040, 1050, 1090, 1111, 1112, 1121, 1122, 1131, 1141, 
	1211, 1212, 1213, 1214, 1221, 1222, 1223, 1230, 1241, 1242, 1243, 1290, 1293, 
	1310, 1311, 1312, 1313, 1330, 1410, 1419, 1421, 1422, 1423, 1510, 1521, 1522, 
	1523, 1524, 1525, 1530, 1531, 1532, 1533, 1534, 1610, 1619, 1620, 1640, 1650, 
	1661, 1662, 1670, 1680, 1690, 1711, 1712, 1713, 1721, 1810, 1820, 1821, 1822, 
	1823, 1824, 1830, 1840, 1910, 1920, 2010, 2020, 2031, 2032, 2040, 2050, 2060, 
	2071, 2072, 2074, 2110, 2190] #食物代码列表
dictfood = {111:'五谷香',112:'小麦粉',113:'面',114:'饼、馒头',115:'面筋',120:'稻米',
         121:'粳米',122:'籼米',123:'糯米',124:'米饭',131:'玉米',132:'玉米笋',141:'大麦',
         142:'青稞',151:'小米',152:'大黄米',190:'高粱米',192:'荞麦',211:'土豆',212:'甘薯',
         213:'木薯',221:'淀粉',222:'粉丝',311:'大豆',312:'豆粉',313:'豆腐',314:'豆浆',
         315:'豆腐干',321:'绿豆',322:'绿豆饼',331:'红豆',332:'豆沙',341:'花豆',351:'蚕豆',
         352:'烤蚕豆',391:'扁豆',392:'豇豆',393:'豌豆',411:'萝卜',412:'胡萝卜',413:'大头菜',
         414:'甜菜根',421:'鲜豆',422:'豆芽',431:'茄子番茄辣椒',432:'冬瓜黄瓜苦瓜南瓜等瓜类',
         441:'大蒜',442:'大葱',443:'洋葱',444:'韭菜',445:'山蒜',451:'大白菜',452:'菜花',
         453:'菠菜等蔬菜',454:'竹笋',460:'水生蔬菜',471:'山药',472:'芋头',473:'姜',480:'野生蔬菜',
         510:'蘑菇',520:'海带',611:'苹果',612:'梨',613:'红果',619:'海棠果',621:'桃',
         622:'李子',623:'枣',629:'酸枣',631:'葡萄',632:'石榴',633:'柿',639:'桑葚',
         641:'橙',642:'柑橘',643:'柚',650:'热带水果',661:'哈密瓜',662:'西瓜',710:'坚果',
         720:'花生瓜子',811:'猪肉',812:'猪杂',813:'腊肉',814:'香肠',821:'牛肉',822:'牛杂',
         823:'牛肉干',831:'羊肉',832:'羊杂',833:'羊肉串',841:'驴肉',842:'驴鞭',843:'卤驴肉',
         890:'狗肉兔肉',911:'鸡',912:'鸡杂',913:'烤鸡',921:'鸭',922:'鸭杂',923:'烤鸭',
         931:'鹅',932:'鹅杂',933:'烧鹅',942:'火鸡杂',943:'代码943的食物',990:'鸽子',1011:'牛奶',
         1012:'羊奶',1013:'人奶',1021:'牛奶粉',1022:'羊奶粉',1030:'酸奶',1040:'奶酪',1050:'奶油',
         1090:'其他乳制品',1111:'鸡蛋',1112:'松花蛋',1121:'鸭蛋',1122:'咸鸭蛋',1131:'鹅蛋',1141:'鹌鹑蛋',
         1211:'鱼',1212:'黄鱼',1213:'鱼油',1214:'代码1214的食物',1221:'虾',1222:'虾米',1223:'代码1223的食材',
         1230:'螃蟹',1241:'鲍鱼扇贝',1242:'蛤蜊',1243:'螺',1290:'墨鱼鱿鱼',1293:'代码1293的食物',1310:'母乳化奶粉',
         1311:'代码1311的食材',1312:'代码1312的食材',1313:'代码1313的食材',1330:'婴幼儿补充食品',1410:'小吃',1419:'代码1419的食材',1421:'蛋糕',
         1422:'月饼',1423:'蛋黄酥',1510:'代码1510的食材 ',1521:'麦片',1522:'方便面',1523:'面包',1524:'饼干',
         1525:'代码1525的食材',1530:'薯片',1531:'代码1531的食材',1532:'代码1532的食材',1533:'代码1533的食材',1534:'代码1534的食材',1610:'可乐',
         1619:'代码1619的食材',1620:'果汁',1640:'果味奶',1650:'植物蛋白饮料',1661:'茶',1662:'茶水',1670:'固体饮料',
         1680:'冰淇淋',1690:'红景天饮料',1711:'啤酒',1712:'葡萄酒',1713:'黄酒',1721:'白酒',1810:'糖',
         1820:'糖果',1821:'代码1821的食材',1822:'代码1822的食材',1823:'代码1823的食材',1824:'代码1824的食材',1830:'果脯',1840:'代码1840的食物',
         1910:'动物油',1920:'植物油',2010:'酱油',2020:'醋',2031:'豆瓣酱',2032:'果酱',2040:'腐乳',
         2050:'咸菜',2060:'香辛料',2071:'盐',2072:'味精',2074:'代码2074的食材',2110:'代码2110的食材',2190:'代码2190的食材'}
for score in sorted(total_score,reverse=True):#降序排列
    #print(score)#得到食材评分
    #print(total_score.index(score))#得到排序后的分数的下标
    #print(food_list[total_score.index(score)])#得到该下标对应的食材代码
    print(dictfood[food_list[total_score.index(score)]])#得到食材代码对应的食材
    #print("--------------")
	








