import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import SegregationMetricCards from '../components/dashboard/SegregationMetricCards.jsx'
import { segregationConfig } from '../data/modules/segregation.js'

export default function Segregation() {
  return (
    <ModulePageTemplate config={segregationConfig}>
      <SegregationMetricCards className="mb-4" />
    </ModulePageTemplate>
  )
}
