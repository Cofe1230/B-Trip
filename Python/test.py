import pymysql;

#db연결
dbURL = '127.0.0.1'
dbPort = 3306
dbUser = 'root'
dbPass = 'root'

conn = pymysql.connect(host=dbURL,port=dbPort,user=dbUser, passwd=dbPass, 
                       db='btrip', charset='utf8', use_unicode=True)

cur = conn.cursor()
