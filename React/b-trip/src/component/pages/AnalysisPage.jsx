import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ReChartBar} from '../ui/Recharts';

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
      console.log(modifiedSData)
    }catch(e){
      console.log(e)
    }
  }
  const vrblYData = [{key:'importance', fill:'#909090'}]
  const shtsYData = [{key:'silhouetteScores', fill:'#909090'}]

  useEffect(()=>{
    getChartData()
  },[])
  return (
    <div>
      <h2>Analysis Page</h2>
      <ReChartBar width={800} height={300} data={vrblImp} xDataKey='name' yDataKey={vrblYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
      <ReChartBar width={800} height={300} data={shtsSc} xDataKey='name' yDataKey={shtsYData}
                      margin = {{top: 5,right: 30,left: 40,bottom: 5}} />
    </div>
  );
};


export default AnalysisPage;