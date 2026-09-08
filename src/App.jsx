import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

import Login from './pages/Login.jsx'
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

export default function App() {
  return (
    <Routes>
      {/* Public Authentication Gate */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/route-tracking"
        element={
          <ProtectedRoute moduleKey="route-tracking">
            <RouteTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/waste-collection"
        element={
          <ProtectedRoute moduleKey="waste-collection">
            <WasteCollection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/geotagging"
        element={
          <ProtectedRoute moduleKey="geotagging">
            <Geotagging />
          </ProtectedRoute>
        }
      />
      <Route
        path="/segregation"
        element={
          <ProtectedRoute moduleKey="segregation">
            <Segregation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bulk-waste-generators"
        element={
          <ProtectedRoute moduleKey="bwg">
            <BulkWasteGenerator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer-station"
        element={
          <ProtectedRoute moduleKey="transfer-station">
            <TransferStation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mrf"
        element={
          <ProtectedRoute moduleKey="mrf">
            <MRF />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rapid-action-team"
        element={
          <ProtectedRoute moduleKey="rat">
            <RapidActionTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/weighbridge"
        element={
          <ProtectedRoute moduleKey="weighbridge">
            <Weighbridge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cctv-monitoring"
        element={
          <ProtectedRoute moduleKey="cctv">
            <CCTVMonitoring />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-charges"
        element={
          <ProtectedRoute moduleKey="user-charges">
            <UserCharges />
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <ProtectedRoute moduleKey="complaints">
            <Complaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/kpi"
        element={
          <ProtectedRoute moduleKey="kpi">
            <KPIDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute moduleKey="reports">
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/street-sweeping"
        element={
          <ProtectedRoute moduleKey="street-sweeping">
            <StreetSweeping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/drain-desilting"
        element={
          <ProtectedRoute moduleKey="drain-desilting">
            <DrainDesilting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute moduleKey="settings">
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
