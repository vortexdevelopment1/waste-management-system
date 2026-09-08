import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { drainDesiltingConfig } from '../data/modules/drainDesilting.js'

export default function DrainDesilting() {
  return <ModulePageTemplate config={drainDesiltingConfig} />
}
