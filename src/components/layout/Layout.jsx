import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
      <Header isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout



