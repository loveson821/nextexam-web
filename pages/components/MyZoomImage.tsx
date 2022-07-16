import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const MyZoomImage = (props: any) => (
  <Zoom>
    <img
      alt=""
      src={props.url}
      className={props.className}
    />
  </Zoom>
)

export default MyZoomImage