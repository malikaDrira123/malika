import React from 'react'
import './box.scss'

const Box = props => {
    const className = {
        box: 'box',
        purple: props.purple && 'box-purple',
        fullheight: props.fullheight && 'box-fullheight'
    }

    return (
        <section className={Object.values(className).join(' ')}>
            {props.children}
        </section>
    )
}

export default Box
