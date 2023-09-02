import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ColumnChart = () => {
  const [data, setData] = useState([
    {
      name: 'Januari',
      data: 10
    },
    {
      name: 'Februari',
      data: 40
    },
    {
      name: 'Maret',
      data: 50
    },
    {
      name: 'April',
      data: 20
    },
    {
      name: 'Mei',
      data: 90
    },
    {
      name: 'Juni',
      data: 120
    },
    {
      name: 'Juli',
      data: 30
    },
    {
      name: 'Agustus',
      data: 60
    },
    {
      name: 'September',
      data: 80
    },
    {
      name: 'Oktober',
      data: 20
    },
    {
      name: 'November',
      data: 60
    },
    {
      name: 'Desember',
      data: 80
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
