import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from './components/footer'
import Header from './components/header'

const Home: NextPage = () => {
  return (
    <div className=' min-h-screen h-full relative'>
      <Header/>
      <div className="container mx-auto mt-20 items-center text-center pb-40">
        刷題
      </div>
      <Footer/>
    </div>
  )
}

export default Home
