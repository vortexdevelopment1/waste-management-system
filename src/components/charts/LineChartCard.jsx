import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function LineChartCard({ data, dataKey = 'value', xKey = 'label', color = '#13B889', height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DCE6F2" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: '#667A99', fontSize: 11 }} axisLine={{ stroke: '#DCE6F2' }} tickLine={false} />
        <YAxis tick={{ fill: '#667A99', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            background: '#FFFFFF',
            border: '1px solid #DCE6F2',
            borderRadius: 12,
            fontSize: 12,
            color: '#102A56',
            boxShadow: '0 2px 12px rgba(30, 70, 110, 0.08)'
          }}
          labelStyle={{ color: '#102A56', fontWeight: 600 }}
          itemStyle={{ color: '#667A99' }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
