import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'

export default function RadarChartCard({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#DCE6F2" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#667A99', fontSize: 11 }} />
        <PolarRadiusAxis tick={{ fill: '#8E9EB5', fontSize: 9 }} axisLine={false} />
        <Radar name="Ward" dataKey="value" stroke="#13B889" fill="#13B889" fillOpacity={0.25} />
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
      </RadarChart>
    </ResponsiveContainer>
  )
}
