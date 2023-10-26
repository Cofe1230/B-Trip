import React from 'react';
import { ScatterChart, Scatter, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function ReChartBar(props) {
  const {data, width, height, ylabel} = props;

  return (
    <div>
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 40,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis label={{value : {ylabel} , angle: -90, position:'insideLeft' }}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="2021" fill="#64B5F6" />
      <Bar dataKey="2022" fill="#4CAF50" />
      <Bar dataKey="2023" fill="#987654" />
    </BarChart>
    </div>
  );
}

export function ReChartScatter(props){
  const {data} = props;
  return (
    <ResponsiveContainer width={1000} height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
