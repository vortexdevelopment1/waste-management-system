import React from 'react'
import Sidebar from '../components/sidebar/Sidebar.jsx'
import Topbar from '../components/topbar/Topbar.jsx'

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-5 sm:p-6 lg:p-7 max-w-[1640px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
