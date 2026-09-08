import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { streetSweepingConfig } from '../data/modules/streetSweeping.js'

export default function StreetSweeping() {
  return <ModulePageTemplate config={streetSweepingConfig} />
}
