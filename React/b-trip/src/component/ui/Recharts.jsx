import React from 'react';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


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
      <XAxis dataKey={xDataKey} />
      {/* <YAxis label={{value : {ylabel} , angle: -90, position:'insideLeft' }}/> */}
      <YAxis />
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