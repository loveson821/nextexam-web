/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import React from 'react';
import Dropdown from '../components/dropdowns';
import Footer from '../components/footer'
import Header from '../components/header'
import { useServices } from '../services';
import UsersPaperService from '../services/users_paper_service';

export default function WaitingCorrection() {
    const { t} = useServices();
    const [data, setData] = React.useState([]);
    const [i_correcting, setI_correcting] = React.useState([])
    const [others, setOthers] = React.useState([])
    React.useEffect(() => {
        loadData('')
      }, []);
    
    const loadData = (status: string) => {
        UsersPaperService.load_waiting_correct_users_papers(1877,{status: status}).then((data: any) => {
            setOthers(data.others)
            setI_correcting(data.i_correcting)
        })
    }

  return (
    <>
        <Header/>
        
        <div className='w-full'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
            <div className="w-9/12 bg-white shadow sm:rounded-md">
                    {
                        i_correcting.length > 0 ? 
                        <div className='p-4  flex flex-shrink-0 flex-row justify-between items-center  mt-2 mb-2 bg-slate-500'>
                            <p className=' text-white text-center'>你正在批改的模擬卷</p>
                        </div> 
                        : null
                    }
                      
                    <ul role="list" className="divide-y divide-gray-200">
                        {i_correcting.map((item:any, index) => (
                        <li key={index}>
                            <a  className="block cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0 m-2">
                                    <p className='text-gray-900'>{item.submit_sequence_number}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <img className="h-12 w-12 rounded-full" src={item.user?.avatar} alt="" />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                    <div className='flex justify-left items-center'>
                                        <p className="text-sm font-medium text-indigo-600 truncate">{item?.user.name}</p>
                                    </div>
                                    <div className="hidden md:block">
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            {item.teacher?.name}
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                            {
                                                item.status == 'done' || item.status == 'wait_proofread'?
                                                    <label>{t.do('exam_status.done_correction')}</label>
                                                : item.status == 'correcting' ?
                                                    <label style={{color: '#4CAF50'}}>{t.do('exam_status.correcting')}</label>
                                                : item.status == 'submited' ?
                                                    <label style={{color:'#FF6C6C'}}>{t.do('exam_status.none_correction')}</label>
                                                : item.status == 'proofreading' ?
                                                    <label>{t.do('exam_status.proofreading')}</label>
                                                : null
                                            }

                                        </p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className='flex flex-row'>
                                    <label className='text-red-500'>({item.score})</label>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className="w-9/12 bg-white shadow sm:rounded-md">
                    <div className='p-4  flex flex-shrink-0 flex-row justify-between items-center  mt-2 mb-2 bg-slate-500'>
                        <p className=' text-white text-center'>全部考卷</p>
                        <div className=''>
                            <Dropdown onSwitch={loadData}/>
                        </div>
                        
                    </div>   
                    <ul role="list" className="divide-y divide-gray-200">
                        {others.map((item:any, index) => (
                        <li key={index}>
                            <a  className="block cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0 m-2">
                                    <p className='text-gray-900'>{item.submit_sequence_number}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <img className="h-12 w-12 rounded-full" src={item.user?.avatar} alt="" />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                    <div className='flex justify-left items-center'>
                                        <p className="text-sm font-medium text-indigo-600 truncate">{item?.user.name}</p>
                                    </div>
                                    <div className="hidden md:block">
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            {item.teacher?.name}
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                        <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                            {
                                                item.status == 'done' || item.status == 'wait_proofread'?
                                                    <label>{t.do('exam_status.done_correction')}</label>
                                                : item.status == 'correcting' ?
                                                    <label style={{color: '#4CAF50'}}>{t.do('exam_status.correcting')}</label>
                                                : item.status == 'submited' ?
                                                    <label style={{color:'#FF6C6C'}}>{t.do('exam_status.none_correction')}</label>
                                                : item.status == 'proofreading' ?
                                                    <label>{t.do('exam_status.proofreading')}</label>
                                                : null
                                            }

                                        </p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className='flex flex-row'>
                                    <label className='text-red-500'>({item.score})</label>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="w-9/12 mt-6">
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
    </>
  )
}
