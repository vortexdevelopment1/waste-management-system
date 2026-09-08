import React from 'react'
import ModulePageTemplate from '../components/module/ModulePageTemplate.jsx'
import { mrfConfig } from '../data/modules/mrf.js'

export default function MRF() {
  return <ModulePageTemplate config={mrfConfig} />
}
