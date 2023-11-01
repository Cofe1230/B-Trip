import React, {useState, useEffect} from 'react';
import axios from 'axios';

const OverViewPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [foriegnVisitors, setForiegnVisitors] = useState([]);
  const getForiegnVisitors = async()=>{
    try{
      const resp = await axios.get('overview/foriegn-visitors')
      setForiegnVisitors(resp.data)
      setIsLoading(false)
      console.log(foriegnVisitors)
    }catch(e){
      console.log(e);
    }
  }
  
  useEffect(()=>{
   getForiegnVisitors()
  },[])
  return (
    <div>
      <h2>개요, 분석 설명?aaaaa</h2>
    </div>
  );
};


export default OverViewPage;