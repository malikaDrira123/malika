import React from 'react'
import './user-info.scss'

const UserInfo = ({ user }) => {
    return (
        <section className='user-info'>
            <section className="user-info__img">
                <img src={user.img} width="50px"alt="" />
            </section>
            <section className="user-info__name">
                <span>{user.name}</span>
            </section>
        </section>
    )
}

export default UserInfo
