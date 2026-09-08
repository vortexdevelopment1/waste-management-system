import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function BarChartCard({ data, dataKey = 'value', xKey = 'label', color = '#3FA9DA', height = 220 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1A2740" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fill: '#5D6E93', fontSize: 11 }} axisLine={{ stroke: '#223252' }} tickLine={false} />
        <YAxis tick={{ fill: '#5D6E93', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#101A2C', border: '1px solid #223252', borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: '#93A3C2' }}
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
