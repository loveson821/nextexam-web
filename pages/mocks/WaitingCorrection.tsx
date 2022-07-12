/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { UsersPaperEditMode } from '../../utils/enums';
import Bar from '../components/bar';
import Dropdown from '../components/dropdowns';
import Footer from '../components/footer'
import Header from '../components/header'
import MyModal from '../components/MyModal';
import { useServices } from '../services';
import MocksService from '../services/mocks_services';
import UsersPaperService from '../services/users_paper_service';

export default function WaitingCorrection() {
    const { t} = useServices();
    const router = useRouter();
    const [data, setData] = React.useState([]);
    const [i_correcting, setI_correcting] = React.useState([])
    const [others, setOthers] = React.useState([])
    const [paper_id] = useState( parseInt( router.query.paper_id+""))
    const [visable, setVisable] = useState(false)
    const [description, setDescription] = useState('')
    
    const pages = [
        { name: '模擬試', href: '/groups', current: true },
        { name:  router.query.group_name, href: '/mocks/courses?group_id='+router.query.group_id+"&group_name="+router.query.group_name, current: true },
        { name:  router.query.curriculum_name, href: '/mocks?course_id='+router.query.course_id+'&group_id='+router.query.group_id+"&group_name="+router.query.group_name+"&curriculum_id="+router.query.curriculum_id+"&curriculum_name="+router.query.curriculum_name, current: true },
        { name:  '改卷列表', href: '/mocks/CorrectionScreen?course_id='+router.query.course_id+'&group_id='+router.query.group_id+"&group_name="+router.query.group_name+"&curriculum_id="+router.query.curriculum_id+"&curriculum_name="+router.query.curriculum_name, current: false}
    ]

    React.useEffect(() => {
        loadData('')
      }, []);
    
    const loadData = (status: string) => {
        UsersPaperService.load_waiting_correct_users_papers(paper_id,{status: status}).then((data: any) => {
            setOthers(data.others)
            setI_correcting(data.i_correcting)
        })
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

                // router.push({
                //     pathname: '/mocks/PaperCorrectDetailScreen',
                //     query: {
                //         paper_id: paper_id,
                //         user_paper_id: item.id
                //     }
                // })
                // navigation.navigate('PaperCorrectDetailScreen', { 
                //   paper_id: route.params.paper_id ,
                //   user_paper_id:item.id, 
                //   title: t.do('exam_all.submit_list'), 
                //   role:route.params.role 
                // })
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
                        setVisable(true)
                        setDescription(data.error)
                    }
                }).catch(err => {
                    setVisable(true)
                    setDescription(err)
                })
            //   setLoad(true)
            //   api.mock.start_correction(item.id).then((res) => {
            //     if( res.data.doc ){
            //       navigation.navigate('UsersPaperScreen', { 
            //         paper_id: route.params.paper_id,
            //         user_paper_id: item.id, 
            //         editMode: UsersPaperEditMode.teacher_edit_mode, 
            //        })
            //     }else{
            //       Alert.alert(res.data.error)
            //     }
            //   }).catch((err) => {
            //     console.log(err);
            //   }).finally(()=>{
            //     setLoad(false)
            //   })
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
                        setVisable(true)
                        setDescription(data.error)
                    }
                }).catch(err => {
                    setVisable(true)
                    setDescription(err)
                })

            //   setLoad(true)
            //   api.mock.start_proofread(item.id).then((res) => {
            //     if( res.data.doc ){
            //       navigation.navigate('UsersPaperScreen', { 
            //         paper_id: route.params.paper_id,
            //         user_paper_id: item.id, 
            //         editMode: UsersPaperEditMode.proof_mode, 
            //        })
            //     }else{
            //       Alert.alert(res.data.error)
            //     }
            //   }).catch((err) => {
            //     console.log(err);
            //   }).finally(()=>{
            //     setLoad(false)
            //   })
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
                        // setVisable(true)
                        // setDescription(t.do('exam_status.start_correction') + "?")
                        var isConfirm = confirm(t.do('exam_status.start_correction') + "?")
                        if( isConfirm )
                            startCorrection()
                    }
                }else{
                    setVisable(true)
                    if( item && item.teacher ){
                        setDescription(item.teacher?.name + "  "+ t.do('exam_status.correcting'))
                    }else setDescription(data.error)
                } 
            }).catch(err => {
                setVisable(true)
                setDescription(err)
            })
            // setLoad(true)
            // api.mock.check_paper_can_correct(item.id).then((res) => {
            //   if( res.data.success ){
            //     if( item.status == 'correcting'){
            //       navigation.navigate('UsersPaperScreen', { 
            //         paper_id: route.params.paper_id,
            //         user_paper_id: item.id, 
            //         editMode: UsersPaperEditMode.teacher_edit_mode, 
            //        })
            //     }else{
            //       Alert.alert(t.do('general.tip'), t.do('exam_status.start_correction') + "?", [
            //         {
            //           'text': t.do('general.cancel'),
            //           'style': "cancel"
            //         },
            //         {
            //           'text': t.do('general.confirm'),
            //           'onPress': () => startCorrection()
            //         }
            //       ])
                  
            //     }
                
            //   }else{
            //     if( item && item.teacher ){
            //       Alert.alert(item.teacher?.name + "  "+ t.do('exam_status.correcting'))
            //     }else{
            //       Alert.alert(res.data.error)
            //     }
            //   }
            // }).catch((err) => {
            //   console.log(err);
            // }).finally(()=>{
            //   setLoad(false)
            // })
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
                    setVisable(true)
                    if( item && item.teacher ){
                        setDescription(t.do('exam_status.has_proofread'))
                    }else setDescription(data.error)
                }  
            }).catch(err => {
                setVisable(true)
                setDescription(err)
            })
            // setLoad(true)
            // api.mock.check_paper_can_proofread(item.id).then((res) => {
            //   if( res.data.success ){
            //     if( item.status == 'proofreading' ){
            //       navigation.navigate('UsersPaperScreen', { 
            //         paper_id: route.params.paper_id,
            //         user_paper_id: item.id, 
            //         editMode: UsersPaperEditMode.proof_mode, 
            //        })
            //     }else{
            //       Alert.alert(t.do('general.tip'), t.do('exam_status.start_proofread') +  "?", [
            //         {
            //           'text': t.do('general.cancel'),
            //           'style': "cancel"
            //         },
            //         {
            //           'text': t.do('general.confirm'),
            //           'onPress': () => startProofread()
            //         }
            //       ])
            //     }
               
            //   }else{
            //     if( item && item.teacher ){
            //       Alert.alert(t.do('exam_status.has_proofread'))
            //     }else{
            //       Alert.alert(res.data.error)
            //     }
            //   }
            // }).catch((err) => {
            //   console.log(err);
            // }).finally(()=>{
            //   setLoad(false)
            // })
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
    <div className=' min-h-screen h-full relative'>
        <Header/>
        
        <div className='w-full pb-40'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
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
                        <li key={index}>
                            <a  className="block cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                <div className="flex-shrink-0 m-2  w-6">
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
                                    {
                                        item.status == 'done' ?  <label className='text-red-500'>({item.score})</label> : ''
                                    }
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                            </a>
                        </li>
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
        <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description}/>
        <Footer/>
    </div>
  )
}
