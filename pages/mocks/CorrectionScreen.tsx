/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Paper from '../../models/Paper';
import Bar from '../components/bar';
import Dropdown from '../components/dropdowns';
import Footer from '../components/footer'
import Header from '../components/header'
import LoadMore from '../components/LoadMore';
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
    const [course_id] = useState( parseInt( router.query.course_id+""))
    const [loading, setLoading] = useState(false)
    const [nodata, setNodata] = useState(false);
    const [page, setPage] = useState(0);
    const count = 10;
    const pages = [
        { name: '模擬試', href: '/mocks/groups', current: true },
        { name:  router.query.group_name, href: '/mocks/courses?group_id='+router.query.group_id+"&group_name="+router.query.group_name, current: true },
        { name:  router.query.curriculum_name, href: '/mocks?course_id='+router.query.course_id+'&group_id='+router.query.group_id+"&group_name="+router.query.group_name+"&curriculum_id="+router.query.curriculum_id+"&curriculum_name="+router.query.curriculum_name, current: true },
        { name: '改卷列表', href: '#', current: false}
    ]

    React.useEffect(() => {
        setPage(0)
        loadData()
      }, []);
    
    const loadData = () => {
        UsersPaperService.practices_can_correct({course: course_id,page: page,count: count}).then((docs: any) => {
            setData(docs)
            console.log(docs);
            setPage(2)
            if( docs.length < count ){
                setNodata(true)
            }
            
        })
    }
    const loadMoreData = () => {
        console.log("page",page);
        if( nodata ) return ;
        setLoading(true)
        UsersPaperService.practices_can_correct({course: course_id,page: page,count: count}).then((docs: any) => {
            setData(data.concat(docs))
            console.log(docs);
            setPage(page => page + 1)
            if( docs.length < count ){
                setNodata(true)
            }
            
        }).finally(()=>{
            setLoading(false)
        })
    }

    const listClick = (paper: Paper) =>{
        Router.push({
            pathname: '/mocks/WaitingCorrection', 
            query: { 
                paper_id: paper.id,
                paper_name: paper.description,
                course_id: course_id, 
                curriculum_id: router.query.curriculum_id,
                curriculum_name: router.query.curriculum_name,
                group_id: router.query.group_id,
                group_name: router.query.group_name
            }
        })
        
    }
  return (
    <>
        <div className="max-w-screen-lg w-full ">
            <Bar pages={pages}/>
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
        <LoadMore
            loadMoreData={loadMoreData}
            loading={loading}
            nodata={nodata}
            />
    </>
  )
}
