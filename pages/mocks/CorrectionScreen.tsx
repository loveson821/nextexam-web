/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Bar from '../components/bar';
import Dropdown from '../components/dropdowns';
import Footer from '../components/footer'
import Header from '../components/header'
import { useServices } from '../services';
import UsersPaperService from '../services/users_paper_service';

export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

export default function CorrectionScreen() {
    const { t} = useServices();
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [course_id] = useState( parseInt( router.query.course_id+"") || 80)
    React.useEffect(() => {
        loadData(0)
      }, []);
    
    const loadData = (page: number) => {
        UsersPaperService.practices_can_correct({course: course_id,page: page,count: 10}).then((docs: any) => {
            setData(docs)
            console.log(docs);
            
        })
    }

    const listClick = (paper: any) =>{
        console.log(paper);
        Router.push('/mocks/WaitingCorrection?paper_id='+paper.id)
        
    }
  return (
    <div className=' min-h-screen h-full relative'>
        <Header/>
        
        <div className='w-full pb-40'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
                <div className="max-w-screen-lg w-full ">
                    <Bar/>
                </div>
                <div className="max-w-screen-lg w-full bg-white shadow sm:rounded-md">
                    <div className='p-4  flex flex-shrink-0 flex-row justify-between items-center  mt-2 mb-2 bg-slate-500'>
                        <p className=' text-white text-center'>{t.do('exam_all.correction_list')}</p>
                    </div>   
                    <ul role="list" className="divide-y divide-gray-200">
                        {data?.map((item:any, index) => (
                        <li key={index} onClick={() => listClick(item)}>
                            <a  className="block cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0 m-2">
                                    <p className='text-gray-900'>{item.description}</p>
                                </div>
                                </div>
                                <div className='flex flex-row'>
                                    <label className='hidden md:block'>{t.do('exam_status.wait_correction')}</label>
                                    <label className='text-red-500'>( {item.correcting_count + item.submited_count}  /  {item.done_count + item.correcting_count + item.submited_count} )</label>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="max-w-screen-lg w-full mt-6">
                    <a
                    href="#"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                    View all
                    </a>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
