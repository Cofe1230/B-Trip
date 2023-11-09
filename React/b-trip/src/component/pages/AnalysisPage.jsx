import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ReChartVertBar, ReChartLine} from '../ui/Recharts';
const AnalysisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vrblImp, setVrblImp] = useState(null);
  const [shtsSc, setShtsSc] = useState(null);

  const getChartData = async()=>{
    try{
      //수정
      const respVrbl = await axios.get(`analysis/vrbl-imp`)
      //수정 끝
      const modifiedVData = respVrbl.data.map((item)=>{
        return{
          ...item,
          name : item.variable,
        }
      })
      //수정
      const respShts = await axios.get(`analysis/shts-sc`)
      //수정 끝
      const modifiedSData = respShts.data.map((item)=>{
        return{
          ...item,
          name : item.n,
        }
      })
      setVrblImp(modifiedVData)
      setShtsSc(modifiedSData)
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }catch(e){
      console.log(e)
    }
  }
  const vrblYData = [{key:'importance', fill:'#909090'}]
  const shtsYData = [{key:'silhouetteScores', stroke:'#909090'}]
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
            <h2>Analysis Page</h2>
      <ReChartVertBar width={700} height={500} data={vrblImp} xDataKey='name' yDataKey={vrblYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
      <ReChartLine width={800} height={300} data={shtsSc} xDataKey='name' yDataKey={shtsYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
          </div>
        )
      }
    </div>
  );
};


export default AnalysisPage;