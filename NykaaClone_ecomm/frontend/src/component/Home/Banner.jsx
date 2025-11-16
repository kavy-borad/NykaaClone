import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './banner.css'

function Carrousell() {
  return (
    <>
    <h2>ertyui</h2>
    <div className='carr'>
          <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src="https://images-static.nykaa.com/creatives/a180b3ef-abeb-4d33-acea-95a91c4ac1c2/default.jpg?tr=w-1200,cm-pad_resize" />
                </div>
                <div>
                    <img src="https://images-static.nykaa.com/creatives/2d96fd53-a09e-4598-890c-f3929e03da11/default.jpg?tr=w-1200,cm-pad_resize" />
                </div>
                <div>
                    <img src="https://images-static.nykaa.com/uploads/d23b82c7-5fa6-4d22-8ada-0b3d2580d6f1.jpg?tr=w-1200,cm-pad_resize" />
                </div>
                <div>
                    <img src="https://images-static.nykaa.com/creatives/e0fb89e9-e234-417f-8535-86033946c6e2/default.jpg?tr=w-1200,cm-pad_resize" />
                </div>
                <div>
                    <img src="https://images-static.nykaa.com/uploads/fe3ae51e-028c-47f2-91b8-ddbec3f11e7e.jpg?tr=w-1200,cm-pad_resize" />
                </div>
                <div>
                    <img src="https://images-static.nykaa.com/creatives/f4153697-c650-48fd-b71b-198f3fb69628/default.jpg?tr=w-1200,cm-pad_resize" />
                </div>
            </Carousel>
    </div>

    </>
  );
}

export default Carrousell;