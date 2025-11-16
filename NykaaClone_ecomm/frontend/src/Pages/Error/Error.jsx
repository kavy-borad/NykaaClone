import React from 'react'
import { Link } from 'react-router-dom'
import "./error.css"

const Error = () => {
  return (
    <div className='er_div'>
      <img className='er_img' src='https://cdn.dribbble.com/users/2410665/screenshots/9479794/media/0626b5eed4efde985f5058b75f1f6835.gif' alt=''/>
      <Link to='/' style={{textDecoration:"none"}}>
      <h1>Please Go back...  &nbsp;<i style={{fontSize: "20px",
      }} class="fa-solid fa-arrow-up-right-from-square"></i></h1>
      </Link>
    </div>
  )
}

export default Error
