import React from 'react'
import Sidebar from '../components/sidebar/Sidebar.jsx'
import Topbar from '../components/topbar/Topbar.jsx'

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title={title} subtitle={subtitle} />
        <main className="p-5 max-w-[1600px] mx-auto space-y-5">{children}</main>
      </div>
    </div>
  )
}
