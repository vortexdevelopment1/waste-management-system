import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts'

export default function RadarChartCard({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#223252" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#93A3C2', fontSize: 11 }} />
        <PolarRadiusAxis tick={{ fill: '#5D6E93', fontSize: 9 }} axisLine={false} />
        <Radar name="Ward" dataKey="value" stroke="#22B8A6" fill="#22B8A6" fillOpacity={0.28} />
        <Tooltip contentStyle={{ background: '#101A2C', border: '1px solid #223252', borderRadius: 6, fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
