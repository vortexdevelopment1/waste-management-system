import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { cctvConfig } from '../data/modules/cctv.js'

export default function CCTVMonitoring() {
  return <ModulePageTemplate config={cctvConfig} />
}
