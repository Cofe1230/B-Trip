import React, {useState, useEffect} from 'react';
import axios from 'axios';
// 수정 ReChartLine추가
import {ReChartBar, ReChartLine} from '../ui/Recharts';
//수정 끝
const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vrblImp, setVrblImp] = useState(null);
  const [shtsSc, setShtsSc] = useState(null);

  const getChartData = async()=>{
    try{
      const respVrbl = await axios.get('analysis/vrbl-imp')
      const modifiedVData = respVrbl.data.map((item)=>{
        return{
          ...item,
          name : item.variable,
        }
      })
      const respShts = await axios.get('analysis/shts-sc')
      const modifiedSData = respShts.data.map((item)=>{
        return{
          ...item,
          name : item.n,
        }
      })
      setVrblImp(modifiedVData)
      setShtsSc(modifiedSData)
      setIsLoading(false)
    }catch(e){
      console.log(e)
    }
  }
  const vrblYData = [{key:'importance', fill:'#909090'}]
  // 수정 STROKE
  const shtsYData = [{key:'silhouetteScores', stroke:'#909090'}]
  // 수정 끝
  useEffect(()=>{
    getChartData()
  },[])
  return (
    <div>
      <h2>Analysis Page</h2>
      <ReChartBar width={800} height={300} data={vrblImp} xDataKey='name' yDataKey={vrblYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
      {/* 수정 ReChartLine */}
      <ReChartLine width={800} height={300} data={shtsSc} xDataKey='name' yDataKey={shtsYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
      {/* 수정끝 */}
    </div>
  );
};


export default AnalysisPage;