import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ColumnChart = () => {
  const [data, setData] = useState([
    {
      name: 'Januari',
      data: 120
    },
    {
      name: 'Februari',
      data: 170
    },
    {
      name: 'Maret',
      data: 210
    },
    {
      name: 'April',
      data: 153
    },
    {
      name: 'Mei',
      data: 202
    },
    {
      name: 'Juni',
      data: 227
    },
    {
      name: 'Juli',
      data: 255
    },
    {
      name: 'Agustus',
      data: 311
    },
    {
      name: 'September',
      data: 0
    },
    {
      name: 'Oktober',
      data: 0
    },
    {
      name: 'November',
      data: 0
    },
    {
      name: 'Desember',
      data: 0
    }
  ]);

  return (
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          data={data}
        >
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="data" fill="#8884d8" barSize={30}/>
        </BarChart>
      </ResponsiveContainer>
  );
};

export default ColumnChart;
