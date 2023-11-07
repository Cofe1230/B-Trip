import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ReChartBar} from '../ui/Recharts';

const OverViewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [foriegnVisitors, setForiegnVisitors] = useState(null);
  //수정 local~ 로 나눠 있던걸 하나로 합치고
  const [spotVisitor, setSpotVisitor] = useState(null);
  //수정 끝
  const getChartData = async()=>{
    try{
      const respVisitor = await axios.get('overview/foriegn-visitors')
      //그래프에 맞게 월별로 데이터 그룹화
      const groupedData = groupDataByMonth(respVisitor.data)
      setForiegnVisitors(groupedData);

      //수정
      const respSpotVisitor = await axios.get('overview/spot-visitors')
      const groupedspotData = groupDataBytitle(respSpotVisitor.data)
      setSpotVisitor(groupedspotData)
      //수정끝
      setIsLoading(false)

    }catch(e){
      console.log(e);
    }
  }
  const visitYData = [{key:2022,fill:'#4CAF50'},{key:2023,fill:'#987654',stackId:'a'},{key:'excepted',fill:'#EEEEEE',stackId:'a'}]
  //수정 fill은 배경에 맞게 변경하셔도 됩니다 (그래프 색)
  const spotYData = [{key:2022 , fill:'#333333'},{key:2021,fill:'#FFD700'}]
  //수정 끝
  
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
            {/* 수정 data yDataKey  */}
            <h3>부산 주요 관광지별 외국인 방문객수 상위 TOP 5 </h3>
            <ReChartBar width={1000} height={300} data={spotVisitor} xDataKey='name' yDataKey={spotYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
            {/* 수정 끝 */}
          </div>
        )
      }
      
    </div>
  );
};
function groupDataByMonth(data) {
  const groupedData = {};

  data.forEach(item => {
    const { month, year, visitor, excepted } = item;

    // "expected" 값이 1인 경우에만 분리
    if (item.hasOwnProperty("excepted") && item.excepted == 1){
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
// 수정 (추가)
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
// 수정 끝
export default OverViewPage;