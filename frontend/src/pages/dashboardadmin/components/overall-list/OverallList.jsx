import React from 'react'
import './overall-list.scss'
import { data } from '../../constants'

const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>,
    <i className='bx bx-cube'></i>,
    <i className='bx bx-dollar'></i>
]

const OverallList = () => {
    return (
        <ul className='overall-list'>
            {
                data.overall.map((item, index) => (
                    <li className="overall-list__item" key={`overall-${index}`}>
                        <section className="overall-list__item__icon">
                            {icons[index]}
                        </section>
                        <section className="overall-list__item__info">
                            <section className="title">
                                {item.value}
                            </section>
                            <span>{item.title}</span>
                        </section>
                    </li>
                ))
            }
        </ul>
    )
}

export default OverallList
