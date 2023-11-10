import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ReChartBar} from '../ui/Recharts';

const OverViewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [foriegnVisitors, setForiegnVisitors] = useState(null);
  const [spotVisitor, setSpotVisitor] = useState(null);
  const getChartData = async()=>{
    try{
      // 수정 ${process.env.REACT_APP_API_URL} '가 아니고 `입니다
      const respVisitor = await axios.get(`${process.env.REACT_APP_API_URL}/overview/foriegn-visitors`)
      // 수정 끝
      //그래프에 맞게 월별로 데이터 그룹화
      const groupedData = groupDataByMonth(respVisitor.data)
      setForiegnVisitors(groupedData);

      //수정 ${process.env.REACT_APP_API_URL}
      const respSpotVisitor = await axios.get(`${process.env.REACT_APP_API_URL}/overview/spot-visitors`)
      //수정 끝
      const groupedspotData = groupDataBytitle(respSpotVisitor.data)
      setSpotVisitor(groupedspotData)
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
      

    }catch(e){
      console.log(e);
    }
  }
  const visitYData = [{key:2022,fill:'#4CAF50'},{key:2023,fill:'#987654',stackId:'a'},{key:'excepted',fill:'#EEEEEE',stackId:'a'}]
  const spotYData = [{key:2022 , fill:'#333333'},{key:2021,fill:'#FFD700'}]
  
  useEffect(()=>{
    getChartData()
  },[])
  return (
    
    <div>
      {
        isLoading ? (
          <div>
          </div>
        ) : (
          <div>
          <h2>개요, 분석 설명?</h2>

            <ReChartBar width={800} height={300} data={foriegnVisitors} xDataKey='name' yDataKey={visitYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
            <h3>부산 주요 관광지별 외국인 방문객수 상위 TOP 5 </h3>
            <ReChartBar width={1000} height={300} data={spotVisitor} xDataKey='name' yDataKey={spotYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
          </div>
        )
      }
      
    </div>
  );
};
function groupDataByMonth(data) {
  const groupedData = {};

  data.forEach(item => {
    const { month, year, visitor } = item;

    // "expected" 값이 1인 경우에만 분리
    if (item.hasOwnProperty("excepted") && item.excepted === 1){
      if (!groupedData[month]) {
        groupedData[month] = { name: month };
      }
      // "expected"를 키로 사용해서 데이터 추가
      groupedData[month].excepted = visitor
    }else{
      if (!groupedData[month]) {
        groupedData[month] = {name:month};
      }
      groupedData[month][year] = visitor;
    }
  });
  return Object.values(groupedData);
}
function groupDataBytitle(data) {
  const groupedData = {};
  data.forEach(item => {
    const { title, year, visitor } = item;
    if (!groupedData[title]) {
      groupedData[title] = {name:title};
    }
    groupedData[title][year] = visitor;
    
  });
  return Object.values(groupedData);
}
export default OverViewPage;