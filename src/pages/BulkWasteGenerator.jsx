import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { bwgConfig } from '../data/modules/bwg.js'

export default function BulkWasteGenerator() {
  return <ModulePageTemplate config={bwgConfig} />
}
