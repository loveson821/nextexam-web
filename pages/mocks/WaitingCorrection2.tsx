/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UsersPaperEditMode } from '../../utils/enums';
import Bar from '../components/bar';
import Dropdown from '../components/dropdowns';
import LoadMore from '../components/LoadMore';
import MyModal from '../components/MyModal';
import { useServices } from '../services';
import UsersPaperService from '../services/users_paper_service';

export default function WaitingCorrection() {
    const { t} = useServices();
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [i_correcting, setI_correcting] = React.useState([])
    const [others, setOthers] = React.useState([])
    const [paper_id, setPaper_id] = useState(parseInt( router.query.paper_id+""))
    const [visable, setVisable] = useState(false)
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [nodata, setNodata] = useState(false);
    const [page, setPage] = useState(1);
    const count = 10;
    const [status, setStatus] = useState('')
    
    const pages = [
        { name: '模擬試', href: '/mocks/groups', current: true },
        { name:  router.query.group_name, href: '/mocks/courses?group_id='+router.query.group_id+"&group_name="+router.query.group_name, current: true },
        { name:  router.query.curriculum_name, href: '/mocks?course_id='+router.query.course_id+'&group_id='+router.query.group_id+"&group_name="+router.query.group_name+"&curriculum_id="+router.query.curriculum_id+"&curriculum_name="+router.query.curriculum_name, current: true },
        { name:  '改卷列表', href: '/mocks/CorrectionScreen?course_id='+router.query.course_id+'&group_id='+router.query.group_id+"&group_name="+router.query.group_name+"&curriculum_id="+router.query.curriculum_id+"&curriculum_name="+router.query.curriculum_name, current: false}
    ]

    React.useEffect(() => {
        loadData('')
      }, []);
    
    const loadData = (status: string) => {
        console.log(paper_id);
        setPaper_id( parseInt( router.query.paper_id+""))
        setStatus(status)
        UsersPaperService.load_waiting_correct_users_papers(paper_id,{status: status,page: page, count: count }).then((data: any) => {
            setOthers(data.others)
            setI_correcting(data.i_correcting)
            if( data.others?.length < count ){
                setNodata(true)
            }
            setPage(2)
        })
    }
    const loadMoreData = () => {
        console.log("page",page);
        if( nodata ) return ;
        setLoading(true)
        UsersPaperService.load_waiting_correct_users_papers(paper_id,{status: status ,page: page, count: count }).then((data: any) => {
            setOthers(others.concat(data.others))

            setPage(page => page + 1)
            if( data.others?.length < count ){
                setNodata(true)
            }
            
        }).finally(()=>{
            setLoading(false)
        })
    }

    const showTip = (description: string) => {
        setVisable(true)
        setDescription(description)
      }
      

    const cancelClick = () => {
        setVisable(false)
    }
    const confirmClick = () => {
        setVisable(false)
    }

    const _renderItem = ( item: any,index : number) => {

        const hangleClick = () => {
            switch( item.status){
              case 'done':
                router.push(`/mocks/detail/${paper_id}?show_model=1&user_paper_id=${item.id}`)
              break;
              case 'wait_proofread':
                checkProofread();
                break;
              case 'submited':
                checkCorrection()
              break;
              case 'proofreading':
                checkProofread();
                break;
              case 'correcting':
                checkCorrection()
                break;
      
            }
          }
          /**
         * 開始改卷
         */
          const startCorrection = () => {
            if( item && item.id ){
                UsersPaperService.start_correction(item.id).then((data: any) => {
                    if( data.doc ){
                        router.push({
                            pathname: '/mocks/UsersPaperScreen',
                            query: {
                                paper_id: paper_id,
                                user_paper_id: item.id,
                                editMode: UsersPaperEditMode.teacher_edit_mode,  
                            }
                        })
                    }else{
                        showTip(data.error)
                    }
                }).catch(err => {
                    showTip(err)
                })
            }
          }
      
           /**
             * 開始審核
             */
         const startProofread = () => {
            if( item && item.id ){
                UsersPaperService.start_proofread(item.id).then((data: any) => {
                    if( data.doc ){
                        router.push({
                            pathname: '/mocks/UsersPaperScreen',
                            query: {
                                paper_id: paper_id,
                                user_paper_id: item.id,
                                editMode: UsersPaperEditMode.proof_mode,  
                            }
                        })
                    }else{
                        showTip(data.error)
                    }
                }).catch(err => {
                    showTip(err)
                })
            }
          }
      
          /**
           * 檢查是否可以改卷
           */
         const checkCorrection = () => {
          if( item && item.id ){
            UsersPaperService.check_paper_can_correct(item.id).then((data: any) => {
                if( data.success ){
                    if( item.status == 'correcting' ){
                        router.push({
                            pathname: '/mocks/UsersPaperScreen',
                            query: {
                                paper_id: paper_id,
                                user_paper_id: item.id,
                                editMode: UsersPaperEditMode.teacher_edit_mode,  
                            }
                        })
                    }else{
                        var isConfirm = confirm(t.do('exam_status.start_correction') + "?")
                        if( isConfirm )
                            startCorrection()
                    }
                }else{
                    if( item && item.teacher ){
                        showTip(item.teacher?.name + "  "+ t.do('exam_status.correcting'))
                    }else showTip(data.error)
                } 
            }).catch(err => {
                showTip(err)
            })
          }
        }
      
          /**
           * 檢查是否可以審核
           */
         const checkProofread = () => {
          if( item && item.id ){
            UsersPaperService.check_paper_can_proofread(item.id).then((data: any) => {
                if( data.succsee ){
                    if( item.status == 'proofreading' ){
                        router.push({
                            pathname: '/mocks/UsersPaperScreen',
                            query: {
                                paper_id: paper_id,
                                user_paper_id: item.id,
                                editMode: UsersPaperEditMode.proof_mode,
                            }
                        })
                    }else{
                        var isConfirm = confirm(t.do('exam_status.start_proofread') + "?")
                        if( isConfirm )
                            startCorrection()
                    }
                }else{
                    if( item && item.teacher ){
                        showTip(t.do('exam_status.has_proofread'))
                    }else showTip(data.error)
                }  
            }).catch(err => {
                showTip(err)
            })
          }
        }

        return (
        <li key={index}>
            <a onClick={hangleClick}  className="block cursor-pointer hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                <div className="flex-shrink-0 m-2 w-6">
                    <p className='text-gray-900'>{item.submit_sequence_number}</p>
                </div>
                <div className="flex-shrink-0">
                    <Image width={100} height={100} className="h-12 w-12 rounded-full" src={item.user?.avatar} alt="" />
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
                    {
                        item.status == 'done' ?  <label className='text-red-500'>({item.score})</label> : ''
                    }
                    
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
            {
                i_correcting?.length > 0 ? 
                <div className='p-4  flex flex-shrink-0 flex-row justify-between items-center  mt-2 mb-2 bg-slate-500'>
                    <p className=' text-white text-center'>{t.do('exam_status.correctioning_exams')}</p>
                </div> 
                : null
            }
                
            <ul role="list" className="divide-y divide-gray-200">
                {i_correcting?.map((item:any, index) => (
                    _renderItem(item, index)
                ))}
            </ul>
        </div>

        <div className="max-w-screen-lg w-full bg-white shadow sm:rounded-md">
            <div className='p-4  flex flex-shrink-0 flex-row justify-between items-center  mt-2 mb-2 bg-slate-500'>
                <p className=' text-white text-center'>{t.do('exam_status.all_exams')}</p>
                <div className=''>
                    <Dropdown onSwitch={loadData}/>
                </div>
                
            </div>   
            <ul role="list" className="divide-y divide-gray-200">
                {others?.map((item:any, index) => (
                    _renderItem(item,index)
                ))}
            </ul>
        </div>
        <LoadMore
            loadMoreData={loadMoreData}
            loading={loading}
            nodata={nodata}
            />
        <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description} />
    </>
  )
}
