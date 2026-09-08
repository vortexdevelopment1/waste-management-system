import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function LineChartCard({ data, dataKey = 'value', xKey = 'label', color = '#22B8A6', height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A2740" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: '#5D6E93', fontSize: 11 }} axisLine={{ stroke: '#223252' }} tickLine={false} />
        <YAxis tick={{ fill: '#5D6E93', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#101A2C', border: '1px solid #223252', borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: '#93A3C2' }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
