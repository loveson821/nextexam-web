import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Footer from './components/footer'
import Header from './components/header'

import { Viewer } from '@react-pdf-viewer/core';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Home: NextPage = () => {
  useEffect(() =>{
    

  },[])

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className=' min-h-screen h-full relative'>
      <Header/>
      <Viewer 
        fileUrl="http://examhero.com/uploads/book_section/pdf/99/四校序及專家團隊名單__20200330.pdf" 
        plugins={[
          // Register plugins
          defaultLayoutPluginInstance
        ]}
      />
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">

      </Worker> */}
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
        <div style={{ height: '750px' }}>
            <Viewer fileUrl="http://examhero.com/uploads/book_section/pdf/99/四校序及專家團隊名單__20200330.pdf" />
        </div>
    </Worker> */}
    </div>
  )
}

export default Home
