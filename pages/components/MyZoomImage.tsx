import Image from 'next/image'
import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const MyZoomImage = (props: any) => (
  <Zoom>
    <Image
      alt=""
      src={props.url || '/empty-image.png'}
      className={props.className}
      width={props.width ||  100}
      height={props.height || 200}
      layout={props.layout || "fixed"}
    />
    {/* <Image src={props.url || '/empty-image.png'} className='w-full h-full object-center object-cover' width={200} height={300} layout="fixed" /> */}
  </Zoom>
)

export default MyZoomImage