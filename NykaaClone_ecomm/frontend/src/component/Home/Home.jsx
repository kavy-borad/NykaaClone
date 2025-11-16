import React from 'react'
import { useEffect, useState } from 'react'
import "./home.css"
import { brands, picData } from './homeData'
import Carousel from 'react-multi-carousel';
import { Loader } from '../Loading'
import 'react-multi-carousel/lib/styles.css';
import Carrousell from './Banner';
import NavSecond from '../header/NavSecond';

const Home = () => {

  const [spin, setspin] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setspin(false)
    }, 1000);
  }, [])

  return (
    <>
     <NavSecond/>
    {
        spin ? <Loader/>: <>
        <Carrousell/>
        <div className='category'>
          <div>
            <img src='https://images-static.nykaa.com/uploads/3c9d74ba-b21e-40ea-a8a8-39969ef0f38b.jpg?tr=w-1200,cm-pad_resize' alt=''/>
          </div>
          <div className='cat_gimg'>
            <img src="https://images-static.nykaa.com/uploads/341b340b-742d-4349-a227-b09bfe27f526.jpg?tr=w-1200,cm-pad_resize" alt="" />
          </div>
        </div>
        <h3>Featured Brands</h3>
        <div className="brands">
          {
            picData.map((e)=>{
              return(
                <>
                  <div>
                    <img src={e.img} alt=''/>
                    <h5>{e.h}</h5>
                    <h6>{e.p}</h6>
                  </div>
                </>
              )
            })
          }
        </div>
        <h3>Top Brands</h3>
        <div className="top_brands">
          {
            brands.map((e)=>{
              return(
                <>
                  <div>
                    <img src={e.img} alt=''/>
                    <h4>{e.h}</h4>
                    <h5>{e.p}</h5>
                  </div>
                </>
              )
            })
          }
        </div>
        </>
    }
    </>
  )
}

export default Home
// #FFC9D9