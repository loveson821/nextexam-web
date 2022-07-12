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
import _ from 'lodash';
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
    const [edit_mode, setEditMode] = React.useState<UsersPaperEditMode>(
        UsersPaperEditMode.show_only_mode,
      );
    const pages = [
    { name: '模擬試', href: '/mocks/groups', current: true },
    { name:  router.query.description, href: '#', current: true }
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
        setEditMode(UsersPaperEditMode.user_edit_mode);
        if (router.query.editMode != undefined) {
          setEditMode(UsersPaperEditMode.user_edit_mode);
        }
      };

    const users_question_for_paper_page = (up: UsersPaper | undefined, pp: PaperPage) => {
        const uq = _.find(up?.users_questions, function (uq) {
          return uq?.question?.id == pp.paper_pageable_id;
        });
        return new UsersQuestion(uq);
      };

    const submit = () => {
        console.log("users_paper", users_paper);
        
    }
    return (
        <div className=' min-h-screen h-full relative'>
            <Header/>
            <div className='w-full pb-40'>
                <div className='flex flex-col w-full pt-2 justify-center items-center'>
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
                                    />
                            ))}
                              <button
                        type="button"
                        onClick={submit}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        {t.do('exam_status.wait_correction')}
                        </button>
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
                </div>
            </div>
            <Footer/>
        </div>
    )
}