import React from 'react'
import './main-layout.scss'
import { Outlet } from 'react-router-dom'
// import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'

import SlideBar from '../components/sideBar/sidebar'

const MainLayout = () => {
    return (
        <>
            <SlideBar/>
            <section className="main">
                <section className="main__content">
                    <TopNav />
                    <Outlet />
                </section>
            </section>
        </>
    )
}

export default MainLayout
