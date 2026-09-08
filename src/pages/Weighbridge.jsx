import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { weighbridgeConfig } from '../data/modules/weighbridge.js'

export default function Weighbridge() {
  return <ModulePageTemplate config={weighbridgeConfig} />
}
