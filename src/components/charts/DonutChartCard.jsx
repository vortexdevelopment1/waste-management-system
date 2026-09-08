import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const DEFAULT_COLORS = ['#13B889', '#2684E8', '#F59E0B', '#20B486', '#8B5CF6', '#D64545']

export default function DonutChartCard({ data, height = 220, colors = DEFAULT_COLORS }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} stroke="#FFFFFF" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#FFFFFF',
            border: '1px solid #DCE6F2',
            borderRadius: 12,
            fontSize: 12,
            color: '#102A56',
            boxShadow: '0 2px 12px rgba(30, 70, 110, 0.08)'
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11, color: '#667A99' }} iconType="circle" iconSize={8} />
      </PieChart>
    </ResponsiveContainer>
  )
}
