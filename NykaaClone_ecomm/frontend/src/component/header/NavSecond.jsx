import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navsecond.css"

const NavSecond = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showBeautyAdvice, setShowBeautyAdvice] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const categories = ['Makeup', 'Skin', 'Hair', 'Fragrances', 'Bath & Body', 'Natural', 'Mom & Baby', 'Health & Wellness'];
  
  const beautyAdvice = [
    { name: 'Makeup Tips', link: '/pro' },
    { name: 'Skincare Routine', link: '/pro' },
    { name: 'Hair Care Guide', link: '/pro' },
    { name: 'Trending Looks', link: '/pro' },
    { name: 'Product Reviews', link: '/pro' }
  ];

  const brands = [
    { name: 'Lakme', link: '/pro' },
    { name: 'Maybelline', link: '/pro' },
    { name: 'L\'Oreal', link: '/pro' },
    { name: 'Nykaa Cosmetics', link: '/pro' },
    { name: 'MAC', link: '/pro' },
    { name: 'The Face Shop', link: '/pro' },
    { name: 'Biotique', link: '/pro' },
    { name: 'Lotus', link: '/pro' }
  ];

  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setShowBeautyAdvice(false);
    setShowBrands(false);
  };

  const toggleBeautyAdvice = () => {
    setShowBeautyAdvice(!showBeautyAdvice);
    setShowCategories(false);
    setShowBrands(false);
  };

  const toggleBrands = () => {
    setShowBrands(!showBrands);
    setShowCategories(false);
    setShowBeautyAdvice(false);
  };

  return (
    <div className='new_nav'>
      <div className="nav_data">
        <div className="left_data">
          <div 
            className="nav-item"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <p onClick={toggleCategories}>Categories</p>
            {showCategories && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                {categories.map((cat, index) => (
                  <Link key={index} to='/pro' style={{textDecoration: 'none'}}>
                    <div className="dropdown-item">{cat}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div 
            className="nav-item"
            onMouseEnter={() => setShowBeautyAdvice(true)}
            onMouseLeave={() => setShowBeautyAdvice(false)}
          >
            <p onClick={toggleBeautyAdvice}>Beauty Advice</p>
            {showBeautyAdvice && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => setShowBeautyAdvice(true)}
                onMouseLeave={() => setShowBeautyAdvice(false)}
              >
                {beautyAdvice.map((item, index) => (
                  <Link key={index} to={item.link} style={{textDecoration: 'none'}}>
                    <div className="dropdown-item">{item.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div 
            className="nav-item"
            onMouseEnter={() => setShowBrands(true)}
            onMouseLeave={() => setShowBrands(false)}
          >
            <p onClick={toggleBrands}>Brands</p>
            {showBrands && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => setShowBrands(true)}
                onMouseLeave={() => setShowBrands(false)}
              >
                {brands.map((brand, index) => (
                  <Link key={index} to={brand.link} style={{textDecoration: 'none'}}>
                    <div className="dropdown-item">{brand.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to='/pro' style={{textDecoration: 'none'}}><p>Makeup</p></Link>
          <Link to='/pro' style={{textDecoration: 'none'}}><p>Skin</p></Link>
          <Link to='/pro' style={{textDecoration: 'none'}}><p>Hair</p></Link>
          <Link to='/pro' style={{textDecoration: 'none'}}><p>Fragrances</p></Link>
        </div>
        <div className="right_data">

        </div>
      </div>
    </div>
  )
}

export default NavSecond
