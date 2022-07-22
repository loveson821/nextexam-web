import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Footer from './components/footer'
import Header from './components/header'

import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const defaultLayoutPluginInstance = defaultLayoutPlugin();

import dynamic from "next/dynamic";

// const PDFViewer = dynamic(() => import("@react-pdf-viewer/core"), {
//   ssr: false
// });

const Home: NextPage = () => {
  useEffect(() => {


  }, [])

  // http://examhero.com/uploads/book_section/pdf/99/四校序及專家團隊名單__20200330.pdf
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className=' min-h-screen h-full relative'>
      <Header />
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js">
        <div style={{ height: '750px' }}>
          <Viewer
            fileUrl="https://examhero.com/uploads/book_section/pdf/99/四校序及專家團隊名單__20200330.pdf"
            plugins={[
              // defaultLayoutPluginInstance,
            ]}
          />
        </div>
      </Worker>
    </div>
  )
}

export default Home
