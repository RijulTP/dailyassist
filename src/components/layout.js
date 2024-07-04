import './globals.css'
import React from "react"
import MainSidebar from './sidebar'
import TopBar from './Topbar'
export default function Layout({ children, sidebarVisible }) {
  return (
    <div className='flex'>
      {sidebarVisible && <MainSidebar/>}
      <TopBar/>
      <main className='flex-grow'>
        {children}
      </main>
    </div>
  )
}
