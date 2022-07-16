import type { NextPage } from 'next'
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Group from '../../models/Group';
import LastMock from '../../models/LastMock';
import { UsersPaperEditMode } from '../../utils/enums';
import Bar from '../components/bar';
import { ExamPaper } from '../components/ExamPaper';
import Footer from '../components/footer';
import Header from '../components/header'
import MyModal from '../components/MyModal';
import { useServices } from '../services';
import MocksService from '../services/mocks_services';
import UsersPaperService from '../services/users_paper_service';

export async function getServerSideProps () {
  // Pass data to the page via props
  return { props: { } }
}

const mocks: NextPage = () => {
    const { t } = useServices();
    const [lastMock, setLastMock] = useState<LastMock>();
    const [groups, setGroups] = useState([]);
    const [role, setRole] = useState()
    const router = useRouter();
    const [published_papers_can_do_count , set_published_papers_can_do_count] = useState(0)
    const [assignments, setAssignments] = useState([])
    const [course_id] = useState( parseInt( router.query.course_id+""))
    const [curriculum_id] = useState( parseInt( router.query.curriculum_id+""))
    const [visable, setVisable] = useState(false)
    const [description, setDescription] = useState('')
    const [isTodo, setIsTodo] = useState(false)
    const pages = [
      { name: '模擬試', href: '/mocks/groups', current: true },
      { name:  router.query.group_name, href: '/mocks/courses?group_id='+router.query.group_id+"&group_name="+router.query.group_name, current: true },
      { name:  router.query.curriculum_name, href: '#', current: true }
    ]

    React.useEffect(() => {
        loadData();
      }, []);

    const loadData = () => {
        MocksService.getLastMockDetail(curriculum_id,course_id).then((doc: any) => {
            if (doc) {
                setLastMock(new LastMock(doc))
            }
            console.log(doc);
            
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })

        MocksService.course_assignments(course_id,0, 100).then((data: any) => {
            if (data.docs) {
                console.log(data);
                var arrs: any = []
                data.docs.map((doc: any) => {
                    doc.assignments.map((assignment: any) => {
                      arrs.push(assignment)
                    })
                  })
                setAssignments(arrs)
                
            }
            setRole(data.role)
            set_published_papers_can_do_count(data.published_papers_can_do_count)
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })
    };

    const enrollButtonClick = () => {
        if (lastMock == null) {
          showTip(t.do('mocks.start_tip'))
          return;
        }
        if (lastMock.isNone()) {
          if (lastMock.canEnrolled()) {
              Router.push("https://www.examhero.com/appkit/papers/" + lastMock.id + "/enroll_info?access_token=" + localStorage.getItem('token'))
          } else if (!lastMock.canEnrolled()) {
            showTip(t.do('mocks.enrolled_tip'))
            return;
          } else if (lastMock.enrolledNotBeing()) {
            showTip(t.do('mocks.start_tip'))
          } else if (lastMock.isFinish()) {
            showTip(t.do('mocks.enrollment_period'))
          } else {
            setIsTodo(true)
            showTip(t.do('mocks.read'))
          }
        } else if (lastMock?.isDoing() && lastMock?.isFinish()) {
          showTip(t.do('mocks.has_end'))
        } else if (lastMock && lastMock.id && lastMock?.isDoing()) {
            Router.push({pathname: '/mocks/UsersPaperScreen', query: {
                paper_id: lastMock?.id,
                user_paper_id: lastMock?.users_paper_id,
                editMode: UsersPaperEditMode.user_edit_mode
            }})
        } else if (lastMock?.isDone()) {
          Router.push("https://www.examhero.com/"+ "/embed/me/transcript?course=" + course_id + "&access_token=" + localStorage.getItem('token'))

        } else {
          Router.push("https://www.examhero.com/"+ "/embed/me/transcript?course=" + course_id+ "&access_token=" + localStorage.getItem('token'))
        }
    
      }
      const listButtonClick = () => {
        Router.push({
          pathname: '/mocks/CorrectionScreen', 
          query: { 
              paper_id: router.query.paper_id,
              course_id: course_id, 
              curriculum_id: router.query.curriculum_id,
              curriculum_name: router.query.curriculum_name,
              group_id: router.query.group_id,
              group_name: router.query.group_name,
          }
        })
      }

      
      /**
       * 開始做卷
       */
      const startTodoData = () => {
        if (lastMock && lastMock.id) {
          UsersPaperService.start_edit_paper(lastMock.id).then((data: any) => {
            if (data.doc) {
              Router.push({
                pathname: '/mocks/UsersPaperScreen', 
                query: { 
                  paper_id: lastMock.id,
                  user_paper_id: data.doc.id,
                  editMode: UsersPaperEditMode.user_edit_mode,
                }
              })
            } else {
              showTip(data.error)
            }
          }).catch((err) => {
            showTip(err.toString())

          }).finally(() => {

          })
        }
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
          if( isTodo ){
            setIsTodo(false)
            startTodoData()
          }
        
      }

  return (
   <div className=' min-h-screen h-full relative'>
      <Header/>
      <div className='w-full pb-40'>
    <div className='flex flex-col w-full pt-2 justify-center items-center'>
      <div className=" max-w-screen-lg w-full">
        <Bar pages={pages}/>
      </div>
        <div className='max-w-screen-lg w-full mt-2 grid  grid-cols-3  gap-4'>
           
            <div className="col-span-2  bg-white rounded-lg border border-red-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                {
                lastMock != null ?
                <div className="p-5">
                   
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{lastMock?.description}</h5>
                    <p className='text-sm'>{t.do('mocks.tip')}</p>
                    <p className='text-sm'>{lastMock?.openTime(t)}</p>
                    <p className='text-sm'>{lastMock?.enrollTime(t)}</p>
                    {
                        lastMock?.status == 'done' ? 
                        <p>{t.do('exam_all.goal')}: {lastMock?.score}</p> :
                        <p>{lastMock?.getStatus(t)}</p>
                    }
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{lastMock?.submit_at(t)}</p>
                    <div className='flex flex-row flex-wrap justify-between'>
                    
                      <a onClick={enrollButtonClick} className="inline-flex cursor-pointer items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          {lastMock?.getLabel(t) || '  '}
                      </a>
                      {
                        role == 'owner' || role == 'moderator' ?
                        <a onClick={listButtonClick} className="inline-flex cursor-pointer items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          {t.do('exam_all.correction_list')}
                        </a>:''
                      }
                    </div>
                </div>
                :
                <div className="p-5">
                    <p>{t.do('mocks.tip_next')}</p>
                </div>
                }
            </div>
            <div className="col-span-1  items-center text-center justify-center bg-white rounded-lg border border-red-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                    <p className=' text-2xl'>{router.query.group_name || ' -- '}</p>
                    <p className='mt-2'>{router.query.curriculum_name|| ' -- '}</p>
                </div>
            </div>
        </div>
        <div className='max-w-screen-lg w-full mt-2 mb-2 text-left bg-slate-500'>
            <p className='m-4 text-white'>{t.do('mocks.head_tip')}({published_papers_can_do_count})</p>
        </div>
        <div className='max-w-screen-lg w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                assignments.map((item: any, index) => (
                    <ExamPaper key={index} role={''} paper={item} course_id={course_id}/>
                ))
            }
        </div>

    </div>
    </div>
    <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description}/>
    <Footer/>
    </div>
  )
}

export default mocks
