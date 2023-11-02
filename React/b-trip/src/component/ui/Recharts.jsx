import React from 'react';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';


export function ReChartBar(props) {
  const {data, width, height, margin, xDataKey, yDataKey} = props;
  return (
    <div>
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={margin}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xDataKey} tick={{ fontSize: 10, fill: 'white' }} />
      
      <YAxis tick={{ fontSize: 14, fill: 'white' }}>
        {/* <Label value="Y-Axis Label" position="insideLeft" angle={-90} style={{ fontSize: '14px', fill: 'white' }} /> */}
      </YAxis>
      <Tooltip />
      <Legend/>
      {
        yDataKey.map((item)=>(
          <Bar key={item.key} dataKey={item.key} fill={item.fill}/>
        ))
      }
    </BarChart>
    </div>
  );
}