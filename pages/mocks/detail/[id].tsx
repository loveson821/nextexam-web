import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from '../../components/header';
import PaperService from '../../services/paper_service';
import LastMock from '../../../models/LastMock';
import Bar from '../../components/bar';
import moment from 'moment';
import { UsersPaper } from '../../../models';
import { useServices } from '../../services';
import UsersPaperService from '../../services/users_paper_service';
import { ExamType, UsersPaperEditMode } from '../../../utils/enums';
import Footer from '../../components/footer';

export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

export default function detail() {
    const router = useRouter();
    const {t} = useServices();
    const [id, setId] = React.useState(0);
    const [paper, setPaper] = React.useState<LastMock>()
    const [user_paper, setUserPaper] = React.useState<UsersPaper>()
    const [status, setStatus] = useState('')
    
    React.useEffect(() => {
        loadData();
    }, []);

    React.useEffect(() => {
      switch( user_paper && user_paper.status ){
        case 'submited':
            setStatus(t.do('exam_status.wait_correction'))
            break
        case 'correcting':
            setStatus(t.do('exam_status.wait_correction'))
            break;
        case 'doing':
            setStatus(t.do('exam_status.continue_do'))
            break;
        default:
            setStatus(t.do('exam_status.start_do'))
            break;
    }
  }, [user_paper]);

    const loadData = () => {
        if( router.query.id ){
            PaperService.papers_can_do(parseInt( router.query.id.toString())).then((doc:any) => {
                console.log("doc",doc);
                setPaper(doc)
                if( doc.users_papers.length > 0 ){
                  setUserPaper(doc.users_papers[0])
                }
                
                // let arrs: any = [];
                // doc.users_papers.map((doc: any,index:any) => {
                //   arrs.push({
                //       key: index,
                //       title: doc.status,
                //       user_paper: doc
                //   });
                // });
                // if( arrs.length == 0){
                //   arrs.push({
                //       key: 0,
                //       title: '',
                //       user_paper: ''
                //   });
                // }
            }).catch(err => {
              console.log("err",err);
              
            })
        }
    }

    function handleTodo(){
      switch( user_paper && user_paper.status ){
          case 'submited':
              // if( show_model == 1) startCorrection();
              break;
          case 'correcting':
              // if( show_model == 1) 
              //     navigation.navigate('UsersPaperScreen', { 
              //         paper_id: paper.id,
              //         user_paper_id: user_paper.id, 
              //         editMode: UsersPaperEditMode.teacher_edit_mode, 
              //    })
              break;
          case 'doing':
            Router.push({
              pathname: '/mocks/UsersPaperScreen',
              query:{
                paper_id: paper?.id,
                user_paper_id: user_paper?.id,
                editMode: UsersPaperEditMode.user_edit_mode, 
              } 
            })
              break;
          default:
              startTodoData()
              break;
      }
  }

   /**
   * 開始做卷
   */
    const startTodoData = () => {
      
      if( paper && paper.id ){
        UsersPaperService.start_edit_paper(paper.id).then((data: any) => {
          Router.push({
            pathname: '/mocks/UsersPaperScreen',
            query:{
              paper_id: paper.id,
              user_paper_id: data.doc.id,
              editMode: UsersPaperEditMode.user_edit_mode, 
            } 
          })
        }).catch(err => {
          console.log(err);
        })
        //   setLoad(true)
        // api.mock.start_edit_paper(paper.id).then((res) => {
        //   if( res.data.doc ){
        //     navigation.navigate('UsersPaperScreen', { 
        //       paper_id: paper.id,
        //       user_paper_id: res.data.doc.id, 
        //       editMode: UsersPaperEditMode.user_edit_mode, 
        //      })
        //   }else{
        //     Alert.alert(res.data.error)
        //   }
        // }).catch((err) => {
        //   console.log(err);
          
        // }).finally(()=>{
        //     setLoad(false)
        // })
      }
    }
  
      /**
     * 開始改卷
     */
       const startCorrection = () => {
          if( user_paper && user_paper.id ){
            UsersPaperService.start_correction(user_paper.id).then((data: any) => {
              Router.push({
                pathname: '/mocks/UsersPaperScreen',
                query:{
                  paper_id: paper?.id,
                  user_paper_id: data.doc.id,
                  editMode: UsersPaperEditMode.teacher_edit_mode, 
                } 
              })
            })
          }
        }
        function delayTime(submited_at: string, deadline?: string){
          let days =  moment(submited_at).diff(moment(deadline),"days")
          let hours =  moment(submited_at).diff(moment(deadline),"hours")
          let minutes  = moment(submited_at).diff(moment(deadline),"minutes")
          let time = ''
          if( days > 0 )
              time = days + t.do('general.day')
          if( hours % 24 > 0 )
              time += (hours % 24) + t.do('general.hours')
          if( minutes % 60 > 0 )
              time += (minutes % 60) + t.do('general.minutes')
          return time
        }
      return (
        <div className=' min-h-screen h-full relative'>
        <Header/>
        <div className='w-full pb-40'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
            <div className="max-w-screen-lg w-full bg-white shadow overflow-hidden sm:rounded-lg">
              <Bar/>
              <div className="-ml-4 -mt-4 px-4 py-5  flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{paper?.description || '--'}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    
                  </p>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                  {
                    user_paper?.status == 'done' ?
                    <label className=' text-4xl text-red-500 italic'>{user_paper?.score || ' -- '}</label>
                    :
                    <button
                      type="button"
                      onClick={handleTodo}
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {status || ' -- '}
                    </button>
                  }
                  
                </div>
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">用途</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.title || '--'}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">課程</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.examination?.name || '--'}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">科目</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.curriculum?.name || '--'}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">題目數量</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.total_questions || '-'}{t.do('exam_detail.total_questions')}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t.do('exam_detail.suggest_time')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.suggest_time || '--'} 分鐘</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t.do('exam_detail.max_score')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.max_score || '--'} 分</dd>
                  </div>
                  {
                    paper?.purpose != '' && (paper?.purpose == ExamType.Assignment || paper?.purpose == ExamType.Practice) ?
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{t.do('exam_detail.done_time')}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{moment(user_paper?.submited_at).diff(moment(user_paper?.started_at),"minutes")}  {t.do('general.minutes')}</dd>
                    </div>:''
                  }
                  {
                    user_paper?.submited_at ?
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{t.do('exam_detail.submited_at')}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {moment(user_paper?.submited_at).format('YYYY-MM-DD HH:mm')}</dd>
                    </div>:''
                  }
                   {
                    user_paper?.submited_at && paper?.deadline && moment(user_paper.submited_at).isAfter(paper.deadline) ?
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{t.do('exam_detail.deadline')}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> {delayTime(user_paper.submited_at,paper.deadline)}</dd>
                    </div>:''
                  }
                  

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{t.do('exam_detail.uploader')}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.group?.name || ' -- '}</dd>
                  </div>

                  {
                    user_paper?.comment?.user ? 
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">{user_paper.comment?.user?.name} {t.do('exam_detail.comment')}</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user_paper?.comment?.body}</dd>
                    </div>
                    : ''
                  }
                  

                </dl>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        </div>
      )
}