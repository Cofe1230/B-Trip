import React from 'react';
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line} from 'recharts';


export function ReChartBar(props) {
  const {data, width, height, margin, xDataKey, yDataKey,} = props;
  return (
    <div>
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={margin}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {/* <XAxis dataKey={xDataKey} tick={{ fontSize: 10, fill: 'white' }} /> */}
      <XAxis interval={0} dataKey={xDataKey} tick={(props) => {
        const { x, y, payload } = props;
        // xDataKey에 따라 레이블 커스터마이즈
        if (payload.value.length > 7) {
          // 7글자 이상이면 ... 추가
          return (
            <text x={x} y={y} fill="white" fontSize={10} textAnchor="middle">
              {`${payload.value.slice(0, 7)}...`}
            </text>
          );
        } else {
          // 7글자 미만이면 그대로 표시
          return (
            <text x={x} y={y} fill="white" fontSize={10} textAnchor="middle">
              {payload.value}
            </text>
          );
        }
      }} />
      <YAxis tick={{ fontSize: 14, fill: 'white' }}>
        {/* <Label value="Y-Axis Label" position="insideLeft" angle={-90} style={{ fontSize: '14px', fill: 'white' }} /> */}
      </YAxis>
      <Tooltip/>
      <Legend/>
      {
        yDataKey.map((item)=>(
          <Bar key={item.key} dataKey={item.key} fill={item.fill} stackId={item.stackId}/>
        ))
      }
    </BarChart>
    </div>
  );
}
// 수정 함수 추가
export function ReChartLine(props){
  const {data, width, height, margin, xDataKey, yDataKey,} = props;
  return (
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={margin}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xDataKey} tick={{ fontSize: 10, fill: 'white' }} />
        <YAxis tick={{ fontSize: 14, fill: 'white' }}/>
        <Tooltip />
        <Legend />
        {
          yDataKey.map((item)=>(
            <Line key={item.key} type="category" dataKey={item.key} stroke={item.stroke} activeDot={{ r: 8 }} />
          ))
        }
      </LineChart>
  );
}
//수정 끝