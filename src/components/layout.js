import './globals.css'
import React from "react"
import MainSidebar from './sidebar'
export default function Layout({ children, sidebarVisible }) {
  return (
    <div className='flex'>
      {sidebarVisible && <MainSidebar/>}
      <main className='flex-grow'>
        {children}
      </main>
    </div>
  )
}
