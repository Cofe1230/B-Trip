import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ReChartBar} from '../ui/Recharts';

const OverViewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [foriegnVisitors, setForiegnVisitors] = useState(null);
  const [localSpotVisitor, setLocalSpotVisitor] = useState(null);
  const [foriegnSpotVisitor, setForiegnSpotVisitor] = useState(null);
  const getChartData = async()=>{
    try{
      const respVisitor = await axios.get('overview/foriegn-visitors')
      //그래프에 맞게 월별로 데이터 그룹화
      const groupedData = groupDataByMonth(respVisitor.data)
      setForiegnVisitors(groupedData);
      const respSpotVisitor = await axios.get('overview/spot-visitors')
      //rechatrs 그래프에 맞게 name : titlename 추가
      const modifiedData = respSpotVisitor.data.map((item)=>{
        return{
          ...item,
          name:item.title.slice(0,6),
        }
      })
      //국가에 따라 분리
      const localData = modifiedData.filter((item)=>item.nationality == 0).slice(0,10)
      const foriegnData = modifiedData.filter((item)=>item.nationality == 1).slice(0,10)
      
      setLocalSpotVisitor(localData)
      setForiegnSpotVisitor(foriegnData)
      setIsLoading(false)
    }catch(e){
      console.log(e);
    }
  }
  const visitYData = [{key:2022,fill:'#4CAF50'},{key:2023,fill:'#987654'}]
  const localSpotYData = [{key:'visitor' , fill:'#000000'}]
  
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
            <h3>관광지별 내국인</h3>
            <ReChartBar width={1000} height={300} data={localSpotVisitor} xDataKey='name' yDataKey={localSpotYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
            <h3>관광지별 외국인</h3>
            <ReChartBar width={1000} height={300} data={foriegnSpotVisitor} xDataKey='name' yDataKey={localSpotYData}
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
    if (!groupedData[month]) {
      groupedData[month] = {name:month};
    }
    groupedData[month][year] = visitor;
  });
  return Object.values(groupedData);
}

export default OverViewPage;