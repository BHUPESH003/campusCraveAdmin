import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Login from 'src/views/pages/login/Login'

const DefaultLayout = () => {
  const token=localStorage.getItem('token')
  return (
    <>
    {token ?
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div> : <Login/>
  }
    </>
  )
}

export default DefaultLayout
