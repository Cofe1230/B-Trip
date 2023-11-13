
# -*- coding: utf-8 -*-

# step1. 라이브러리 불러오기
import requests
from sqlalchemy import create_engine
import pymysql
from bs4 import BeautifulSoup as bs
import schedule
import time
from datetime import datetime, timedelta
import pandas as pd
from urllib.parse import urlparse, parse_qs, quote_plus

# 숙박 시설 정보 크롤링
def do_acm_cr():

    start = time.time()
    
    # step2. DB생성
    conn = pymysql.connect(host='localhost',
                        user='root',
                        password='ddbs@7894',
                        db='btrip',
                        charset='utf8')

    sql = '''CREATE TABLE IF NOT EXISTS acm_list (
            id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            title varchar(255),
            location varchar(255),
            img_url varchar(255),
            link_url varchar(255),
            rating int,
            score varchar(255),
            price int,
            tax_charge varchar(255)
            )
            '''

    with conn:
        with conn.cursor() as cur:
            cur.execute(sql)
            conn.commit()
    
    # step3. 변수 선언


    # 데이터 담을 변수
    acm_id = []            # 데이터 아이디
    acm_name = []          # 이름
    acm_location = []      # 지역
    acm_img_url = []       # 이미지 url
    acm_link_url = []      # 링크 url
    acm_rating = []        # 숙소 등급
    acm_score = []         # 숙소 평점
    acm_price = []         # 숙소 요금
    acm_tax_fee = []       # 세금, 추가요금
    id = 1

    today = datetime.today().strftime("%Y-%m-%d")
    tomorrow = (datetime.today() + timedelta(1)).strftime("%Y-%m-%d")
    print('check in : ' + today, flush = True)
    print('check out : ' + tomorrow, flush = True)

    page_num = 0

    headers = {
                "User-Agent":
                "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
                }
    url = f'https://www.booking.com/searchresults.html?label=6IqJCVieL5dzMEtpzqWb6EYJVaTBlk1l-QANkJ0NfLVqTd4IsK4wErA%3D%3D&sid=b532ecf66b39a2350ca4190d40062eff&aid=2210273&no_rooms=1&srpvid=53ad070f2750005e&highlighted_hotels=6696048&checkin={today}&redirected=1&city=-713900&hlrd=with_dates&group_adults=2&source=hotel&group_children=0&checkout={tomorrow}&keep_landing=1&order=bayesian_review_score'

    # step4. html 정보 받아와서 파싱

    response = requests.get(url, headers=headers)
    soup = bs(response.text , 'html.parser')

    page = int(soup.select('li.b16a89683f')[-1].string)
    

    # step5. 타겟 페이지 크롤링
    for i in range(page):       

        page_num = i * 25

        url = f'https://www.booking.com/searchresults.html?label=6IqJCVieL5dzMEtpzqWb6EYJVaTBlk1l-QANkJ0NfLVqTd4IsK4wErA%3D%3D&sid=b532ecf66b39a2350ca4190d40062eff&aid=2210273&no_rooms=1&srpvid=53ad070f2750005e&highlighted_hotels=6696048&checkin={today}&redirected=1&city=-713900&hlrd=with_dates&group_adults=2&source=hotel&group_children=0&checkout={tomorrow}&keep_landing=1&order=bayesian_review_score&offset={page_num}'

        print(url, flush = True)
        response = requests.get(url, headers=headers)
        soup = bs(response.text , 'html.parser')

        print('[ Accommodations ] : ' + str(i+1) + ' / ' + str(page) + ' 페이지 >> 크롤링 작업 [ 시작 ]', flush = True)

        # 숙소 아이템 요소 리스트
        items = soup.select('div[data-testid="property-card"]')
        

        # 데이터 갈무리
        # 숙소 이름
        for item in items :
            acm_id.append(id)
            id = id + 1
            acm_name.append(item.select_one('div[data-testid="title"]').string)
            acm_location.append(item.select_one('span[data-testid="address"]').string)
            acm_img_url.append(item.select_one('img[data-testid="image"]')['src'])
            acm_link_url.append(item.select_one('a[data-testid="availability-cta-btn"]')['href'].split('?',1)[0])
            
            rating = item.select_one('div[data-testid="rating-stars"]')
            if rating is None :
                acm_rating.append(0)
            else :
                acm_rating.append(len(rating.select('span')))
            
            score = item.select_one('div.a3b8729ab1.d86cee9b25')
            if score is None :
                acm_score.append('-')
            else :
                acm_score.append(score.string)

            acm_price.append(int(item.select_one('span[data-testid="price-and-discounted-price"]').string.split()[1].replace(',','')))
            acm_tax_fee.append(item.select_one('div[data-testid="taxes-and-charges"]').string)
            
        
        print('[ Accommodations ] 크롤링 작업 [ 완료 ] \n', flush = True)


    # step6. zip 모듈을 이용해서 list를 묶어주기        
    acm_list = list(zip(acm_id,
                        acm_name,
                        acm_location,
                        acm_img_url,
                        acm_link_url,
                        acm_rating,
                        acm_score,
                        acm_price,
                        acm_tax_fee))

    # step7. 데이터프레임의 첫행에 들어갈 컬럼명
    col = ['id','title', 'location','img_url','link_url', 'rating', 'score', 'price', 'tax_charge']

    # step8. pandas 데이터 프레임 형태로 가공
    df = pd.DataFrame(acm_list, columns=col)

    # step9. DB, 엑셀에 저장
    # DB연결 (sqlalchemy)
    encoded_password = quote_plus('ddbs@7894')
    db_con_str = f'mysql+pymysql://root:{encoded_password}@localhost/btrip'
    db_connection = create_engine(db_con_str)
    conn = db_connection.connect()

    df.to_sql(name='acm_list', con=conn, if_exists='replace',index=False)  

    print('<<< 숙박시설 데이터 크롤링 작업 완료 >>>', flush = True)
    print(datetime.now(), flush = True)
    end = time.time()
    print('소요시간 : ' + f"{end - start : .5f} sec", flush = True)



do_acm_cr()
