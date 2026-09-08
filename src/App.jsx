import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard.jsx'
import RouteTracking from './pages/RouteTracking.jsx'
import WasteCollection from './pages/WasteCollection.jsx'
import Geotagging from './pages/Geotagging.jsx'
import Segregation from './pages/Segregation.jsx'
import BulkWasteGenerator from './pages/BulkWasteGenerator.jsx'
import TransferStation from './pages/TransferStation.jsx'
import MRF from './pages/MRF.jsx'
import RapidActionTeam from './pages/RapidActionTeam.jsx'
import Weighbridge from './pages/Weighbridge.jsx'
import CCTVMonitoring from './pages/CCTVMonitoring.jsx'
import UserCharges from './pages/UserCharges.jsx'
import Complaints from './pages/Complaints.jsx'
import KPIDashboard from './pages/KPIDashboard.jsx'
import Reports from './pages/Reports.jsx'
import StreetSweeping from './pages/StreetSweeping.jsx'
import DrainDesilting from './pages/DrainDesilting.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/route-tracking" element={<RouteTracking />} />
      <Route path="/waste-collection" element={<WasteCollection />} />
      <Route path="/geotagging" element={<Geotagging />} />
      <Route path="/segregation" element={<Segregation />} />
      <Route path="/bulk-waste-generators" element={<BulkWasteGenerator />} />
      <Route path="/transfer-station" element={<TransferStation />} />
      <Route path="/mrf" element={<MRF />} />
      <Route path="/rapid-action-team" element={<RapidActionTeam />} />
      <Route path="/weighbridge" element={<Weighbridge />} />
      <Route path="/cctv-monitoring" element={<CCTVMonitoring />} />
      <Route path="/user-charges" element={<UserCharges />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/kpi" element={<KPIDashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/street-sweeping" element={<StreetSweeping />} />
      <Route path="/drain-desilting" element={<DrainDesilting />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
