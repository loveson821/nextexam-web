import type { NextPage } from 'next'
import Link from 'next/link';
import React, { useState } from 'react';
import Alerts from '../components/alerts';
import Footer from '../components/footer';
import Header from '../components/header'
import MocksService from '../services/mocks_services';

const mocks: NextPage = () => {
    const [data, setData] = useState()
    const [assignments, setAssignments] = useState([])
    React.useEffect(() => {
        loadData();
      }, []);

    const loadData = () => {
        MocksService.groups().then((docs: any) => {
            console.log("docs: ", docs);
            
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })

        MocksService.getLastMockDetail(110,74).then((doc: any) => {
            if (doc) {
                setData(doc)
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })

        MocksService.course_assignments(74,0, 10).then((docs: any) => {
            if (docs) {
                console.log(docs);
                var arrs: any = []
                docs.map((doc: any) => {
                    doc.assignments.map((assignment: any) => {
                      arrs.push(assignment)
                    })
                  })
                setAssignments(arrs)
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })
    };
  return (
   <>
      <Header/>
      <div className='w-full'>
    <div className='flex flex-col w-full pt-2 justify-center items-center'>
        <div className='w-9/12 grid grid-cols-1  gap-4'>

        
            <div className="max-w-sm bg-white rounded-lg border border-red-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
                    </a>
                </div>
            </div>
        </div>
        <div className='w-9/12 mt-2 mb-2 text-left bg-slate-500'>
            <p className='m-4 text-white'>模擬試考前練習</p>
        </div>
        <div className='w-9/12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                assignments.map((item: any, index) => (
                    <div key={index}   className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <Link href={`/mocks/detail/${item.id}`}>
                            <div className=' cursor-pointer'>
                                <a  className=' cursor-pointer'>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.description}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.examination.name} - {item.curriculum.name}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.curriculum.name}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.curriculum.name}</p>
                            </div>
                        </Link>
                        <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            開始做卷
                            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
                        </a>
                    </div>
                ))
            }
        </div>

    </div>


      
    </div>
    <Footer/>
    </>
  )
}

export default mocks
