#进行模型训练
import lightgbm as lgb
from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn import metrics

###设置是否保存模型,1为保存，2为不保存
savemodel = 0
###设置文件交互
model_name = 'abc.txt' #定义模型存储文件的名
data_file = 'age11-18.csv' #指明数据集文件

data = pd.read_csv(data_file)#读取数据集。要求有ID，饮食习惯和health分数
unit = pd.read_csv("100unit.csv") #每种食物100g的矩阵，用以计算每种食物的评分

### 数据拆分(训练集+验证集+测试集)
print('数据拆分')
train_xy,offline_test = train_test_split(data,test_size = 0.2,random_state=21)#offline是测试集
train,val = train_test_split(train_xy,test_size = 0.2,random_state=21)#train是训练集，val是验证集
# 训练集
y_train = train.health                                               # 训练集标签
X_train = train.drop(['IDIND','health','age','sex','U22','U24A','SYSTOL1','SYSTOL2',
                      'SYSTOL3','DIASTOL1','DIASTOL2','DIASTOL3','HEIGHT','WEIGHT',
                      'U7','U8A','U8B','U8C','U9','U10'],axis=1)                # 训练集特征矩阵,抛开无关特征
# 验证集
y_val = val.health                                                   # 验证集标签
X_val = val.drop(['IDIND','health','age','sex','U22','U24A','SYSTOL1','SYSTOL2',
                   'SYSTOL3','DIASTOL1','DIASTOL2','DIASTOL3','HEIGHT','WEIGHT',
                   'U7','U8A','U8B','U8C','U9','U10'],axis=1)                   # 验证集特征矩阵
# 测试集
offline_test_X = offline_test.drop(['IDIND','health','age','sex','U22','U24A','SYSTOL1','SYSTOL2',
                                    'SYSTOL3','DIASTOL1','DIASTOL2','DIASTOL3','HEIGHT','WEIGHT',
                                    'U7','U8A','U8B','U8C','U9','U10'],axis=1)  # 线下测试特征矩阵
### 数据转换
print('数据转换')
lgb_train = lgb.Dataset(X_train, y_train, free_raw_data=False)
lgb_eval = lgb.Dataset(X_val, y_val, reference=lgb_train,free_raw_data=False)

###训练
params = {
        'task': 'train',
        'boosting_type': 'gbdt',
        'objective': 'regression',
        'metric': {'l2', 'auc'},
        'num_leaves': 16,
        'learning_rate': 0.05,
        'feature_fraction': 0.9,
        'bagging_fraction': 0.8,
        'bagging_freq': 5,
        'verbose': -1
        }


print ("开始训练")
model=lgb.train(
          params,                     # 参数字典
          lgb_train,                  # 训练集
          valid_sets=lgb_eval,        # 验证集
          num_boost_round=500,       # 迭代次数
          )
		  
if savemodel == 1:
	model.save_model(model_name)  # 训练后保存模型到文件