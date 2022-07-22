import React, { useState } from 'react';
import { UsersQuestion } from '../../models';
import Paper from '../../models/Paper';
import PaperPage from '../../models/PaperPage';
import UsersPaper from '../../models/UsersPaper';
import Bar from '../components/bar';
import Footer from '../components/footer'
import Header from '../components/header'
import { useServices } from '../services';
import PaperService from '../services/paper_service';
import UsersPaperService from '../services/users_paper_service';
import _, { parseInt } from 'lodash';
import PaperPageView from '../components/users_paper/PaperPageView';
import { PaperPageableType, UsersPaperEditMode } from '../../utils/enums';
import { Router, useRouter } from 'next/router';

export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

export default function UsersPaperScreen(props: any) {
    const { t} = useServices();
    const router = useRouter();
    const [users_paper, setUsersPaper] = React.useState<UsersPaper>();
    const [paper, setPaper] = React.useState<Paper>();
    const [data, setData] = React.useState([]);
    const [num, setNum] = useState(0)
    const [edit_mode, setEditMode] = React.useState(0);
    const pages = [
    { name: '模擬試', href: '/mocks/groups', current: true },
    { name:  paper?.description, href: '#', current: true }
    ]
    var m = 1;
    var q = 1;
    var mm = 1;
    var qq = 1;

    React.useEffect(() => {
        handlingEditMode()
        loadData()
      }, []);


    const loadData = async () => {
        console.log(router.query.paper_id);
        console.log(router.query.user_paper_id);
        // var paper_id = 1853;
        // var user_paper_id = 12983;
        var paper_id = parseInt( router.query.paper_id+"");
        var user_paper_id = parseInt( router.query.user_paper_id+"" );
        const res = await PaperService.load(paper_id);
        const paper = new Paper(res);
        
        if (user_paper_id) {
          const r = await UsersPaperService.load(user_paper_id);
          const up = new UsersPaper(r);
          setUsersPaper(up);
        }
        setPaper(paper)
        
    }

    const handlingEditMode = () => {
        // setEditMode(UsersPaperEditMode.user_edit_mode);
        if (router.query.editMode != undefined) {
            console.log(router.query.editMode);
             setEditMode(parseInt(router.query.editMode+""));
        }
      };

    const users_question_for_paper_page = (up: UsersPaper | undefined, pp: PaperPage) => {
        const uq = _.find(up?.users_questions, function (uq) {
          return uq?.question?.id == pp.paper_pageable_id;
        });
        return new UsersQuestion(uq);
      };

    const force_submit = async () => {
        if (users_paper == undefined || users_paper.id == undefined) return
        // console.log("users_paper", users_paper);
        // router.back()
        switch (edit_mode) {
            case UsersPaperEditMode.user_edit_mode:
                UsersPaperService.submit(users_paper.id).then((res) => {
                    alert(t.do('general.save_success'))
                    router.back()
                  }).catch((err) => {
                    alert(err.toString());
                  })
                break;
            case UsersPaperEditMode.teacher_edit_mode:
                var comment = ''
                _.forEach(users_paper.users_questions, function (uq, index) {
                    if (uq.remark) {
                        comment += "(Q" + (index + 1) + ") " + uq.remark + "\n"
                    }
                })
                UsersPaperService.submit_correction(users_paper.id, users_paper.users_questions, comment).then((res) => {
                    alert(t.do('general.save_success'))
                    router.back()
                  }).catch((err) => {
                    alert(err.toString());
                  })
                break;
            case UsersPaperEditMode.proof_mode:
                UsersPaperService.submit_proofread(users_paper?.id,users_paper.users_questions).then((res) => {
                    alert(t.do('general.save_success'))
                    router.back();
                }).catch((err) => {
                    alert(err.toString());
                })
              break;
            default:
                break;
        }
       
      }

    const update = () => {
        console.log("update");
        setNum(num => num + 1)
        
    }
    return (
        <>
            <div className="max-w-screen-lg w-full ">
                <Bar pages={pages} />
            </div>
            <div className="max-w-screen-lg w-full flex sm:rounded-md">
                <ul role="list" className=" max-w-3xl space-y-6">
                    {paper?.paper_pages.map((item:any, index) => (
                        <PaperPageView 
                            key={index}
                            mIndex={item.paper_pageable_type == PaperPageableType.MediaPage? m++ : m}
                            qIndex={item.paper_pageable_type == PaperPageableType.Question? q++ : q}
                            paper_page={item} 
                            users_paper={users_paper}
                            users_question={users_question_for_paper_page(users_paper, item)}
                            edit_mode={edit_mode}
                            update={update}
                            />
                    ))}
                    
                </ul>

                <div className='hidden sm:block ml-4 z-10 max-h-screen overflow:scroll'>
                    
                    <div className="flex flex-col m-0 fixed  bg-white shadow px-4 py-5 sm:px-6   justify-between">
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                            
                            {users_paper?.users_questions?.map((item:UsersQuestion, index) => (
                                <span
                                    key={index}
                                    className={item.hasAnswer() ? 
                                        'inline-flex items-center justify-center  h-10 w-10 m-1  border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        : 'inline-flex items-center justify-center  h-10 w-10 m-1  border border-transparent rounded-full shadow-sm text-white bg-gray-500  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
                                    >
                                    <a href={'#paper_'+item.question?.id} className='text-sm' aria-hidden="true" >{item.question?.paper_pageable_type == 'MediaPage' ? 'M'+mm++ : 'Q'+qq++ }</a>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-lg flex sm:rounded-md m-4 justify-center">
                <button
                    type="button"
                    onClick={force_submit}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    {t.do('general.submit')}
                </button>
            </div>
            
        </>
    )
}