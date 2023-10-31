import pymysql;
import pandas as pd;

#db연결
dbURL = '127.0.0.1'
dbPort = 3306
dbUser = 'root'
dbPass = 'root'

conn = pymysql.connect(host=dbURL,port=dbPort,user=dbUser, passwd=dbPass,
                       db='btrip', charset='utf8', use_unicode=True)
curs = conn.cursor(pymysql.cursors.DictCursor)
insert_sql = 'insert into tourist_spot_visitors(title, visitor, nationality) values(%s,%s,%s)'

df_local = pd.read_excel('data/spot_visitors_local.xlsx', engine='openpyxl')
df_foreigner = pd.read_excel('data/spot_visitors_foreigner.xlsx', engine='openpyxl')

#내국인 관광지별 방문객 db입력
nationality = 0
for i in df_local.index:
  title = df_local.loc[i]['관광지명']
  visitor = df_local.loc[i]['내국인 방문자 수']
  curs.execute(insert_sql,(title,visitor,nationality))
#외국인 관광지별 방문객 db 입력
nationality = 1
for i in df_foreigner.index:
  title = df_foreigner.loc[i]['관광지']
  visitor = df_foreigner.loc[i]['외국인 관광객 수']
  curs.execute(insert_sql,(title,visitor,nationality))

conn.commit()
print('insert DataBase')