import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const DEFAULT_COLORS = ['#22B8A6', '#3FA9DA', '#EFA23D', '#4CC77E', '#E96A6A', '#9B8CE8']

export default function DonutChartCard({ data, height = 220, colors = DEFAULT_COLORS }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} stroke="#0A101C" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: '#101A2C', border: '1px solid #223252', borderRadius: 6, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11, color: '#93A3C2' }} iconType="circle" iconSize={8} />
      </PieChart>
    </ResponsiveContainer>
  )
}
