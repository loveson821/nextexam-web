import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

export default function Home() {
  const [visable, setVisable] = useState(true)
  useEffect(() => {


  }, [])

  return (
    <div className=''>
      {/* <Loading visable={visable} cancelClick={()=>{setVisable(false)}} /> */}
      刷题
    </div>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <div>{page}</div>
//   )
// }