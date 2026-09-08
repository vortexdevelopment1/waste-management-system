import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { transferStationConfig } from '../data/modules/transferStation.js'

export default function TransferStation() {
  return <ModulePageTemplate config={transferStationConfig} />
}
