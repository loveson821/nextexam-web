/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from '@heroicons/react/solid';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import useSWRInfinite from "swr/infinite";
import Paper from '../../models/Paper';
import Bar from '../components/bar';
import LoadMore from '../components/LoadMore';
import axiosInstance from '../helper/axiosInstance';
import { useServices } from '../services';

export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

export default function CorrectionScreen() {
    const { t} = useServices();
    const router = useRouter();
    const [course_id] = useState( parseInt( router.query.course_id+""))
    const pages = [
        { name: '模擬試', href: '/mocks/groups', current: true },
        { name:  router.query.group_name, href: '/mocks/courses?group_id='+router.query.group_id+"&group_name="+router.query.group_name, current: true },
        { name:  router.query.curriculum_name, href: '/mocks?course_id='+router.query.course_id+'&group_id='+router.query.group_id+"&group_name="+router.query.group_name+"&curriculum_id="+router.query.curriculum_id+"&curriculum_name="+router.query.curriculum_name, current: true },
        { name: '改卷列表', href: '#', current: false}
    ]

    const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data.docs);
     const { data , error,size, setSize, mutate, isValidating } = useSWRInfinite(
         (index) =>
             `me/practices_can_correct.json?course=${course_id}&count=${PAGE_SIZE}&page=${index+1}`,
             fetcher
         );
    const PAGE_SIZE = 10;
    const datas = data ? [].concat(...data) : [];
    
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

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
    const _renderItem = (paper: Paper, index: number) => {
        return (
            <li key={index} onClick={() => listClick(paper)}>
                <a  className="block cursor-pointer hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0 m-2">
                        <p className='text-gray-900'>{paper.description}</p>
                    </div>
                    </div>
                    <div className='flex flex-row'>
                        <label className='hidden md:block'>{t.do('exam_status.wait_correction')}</label>
                        <label className='text-red-500'>( {(paper?.correcting_count || 0) + (paper?.submited_count || 0)}  /  {(paper.done_count || 0) + (paper.correcting_count || 0) + (paper.submited_count || 0)} )</label>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                </div>
                </a>
            </li>
        )
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
                {datas?.map((item:any, index) => (
                    _renderItem(item,index)
                ))}
            </ul>
        </div>
        <LoadMore
            disabled = {isLoadingMore || isReachingEnd}
            loadMoreData={() => setSize(size + 1)}
            isLoadingMore = {isLoadingMore}
            isReachingEnd = {isReachingEnd}
            />
    </>
  )
}
