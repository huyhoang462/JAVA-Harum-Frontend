import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DefaultLayout() {
  return (
    <div className='bg-white'>DefaultLayout
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
