import React, { useEffect, useRef } from 'react'
import './progress-bar.scss'

const ProgressBar = ({ value }) => {
    const barInnerRef = useRef()

    useEffect(() => {
        barInnerRef.current.style.width = `${value}%`
    }, [value]) // Inclure la variable 'value' dans le tableau de dépendances

    return (
        <section className='progress-bar'>
            <section ref={barInnerRef} className="progress-bar__inner"></section>
        </section>
    )
}

export default ProgressBar
