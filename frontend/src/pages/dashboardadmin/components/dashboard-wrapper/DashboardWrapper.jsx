import React from 'react'
import './dashboard-wrapper.scss'

const DashboardWrapper = props => {
    return (
        <section className='dashboard-wrapper'>
            {props.children}
        </section>
    )
}

export default DashboardWrapper

export const DashboardWrapperMain = props => {
    return (
        <section className='dashboard-wrapper__main'>
            {props.children}
        </section>
    )
}

export const DashboardWrapperRight = props => {
    return (
        <section className='dashboard-wrapper__right'>
            {props.children}
        </section>
    )
}