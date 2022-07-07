import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from './components/header'

const Home: NextPage = () => {
  return (
    <div>
      <Header/>
      <div className="container mx-auto mt-20 items-center text-center">
      <div className="space-y-4 ...">
  <span className="block ...">1</span>
  <span className="block ...">2</span>
  <span className="block ...">3</span>
</div>
<div>
  <div className="inline ...">1</div>
  <div className="inline ...">2</div>
  <div className="inline ...">3</div>
</div>
      </div>
    </div>
  )
}

export default Home
