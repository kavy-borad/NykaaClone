import React from 'react'
import { Link } from 'react-router-dom'
import "./smallnav.css"

const SmallNav = () => {
  return (
    <div className='new_nav_small'>
        <div className="left_data_small">
          <Link to='/admin' style={{textDecoration: 'none'}}><p>Admin Panel</p></Link>
          <Link to='/adminform' style={{textDecoration: 'none'}}><p>Add Products</p></Link>
          <Link to='/users' style={{textDecoration: 'none'}}><p>All Users</p></Link>
          <Link to='/landing' style={{textDecoration: 'none'}}><p>Dashboard</p></Link>
        </div>
    </div>
  )
}

export default SmallNav
