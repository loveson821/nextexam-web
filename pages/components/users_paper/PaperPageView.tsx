import React, { useState } from 'react';
import _ from 'lodash';
import { PaperPageableType, UsersPaperEditMode } from '../../../utils/enums';
import MyAnswerView from './MyAnswerView';
import QuestionActionButton from './QuestionActionButton';
import MyLine from '../MyLine';
import { useServices } from '../../services';
import UsersQuestionService from '../../services/users_question_service';

export default function PaperPageView(props: any) {
    const { t } = useServices();
    React.useEffect(() => {
      }, []);
    
      // 點擊入去手畫圖
      const onImageClick = async (index = -1) => {
        if (props.edit_mode == UsersPaperEditMode.teacher_edit_mode) {
            onImageCorrecting(index)
        } else {
            onImageAnswer(index)
        }
    }

    const onImageAnswer = async (index = -1) => {
        console.log("onImageAnswer")
        const { navigation, users_question } = props;
        var url = users_question.get_image_answer_path_by_index(index)
        navigation.push('CorrectingAnswerScreen', {
          users_question: props.users_question,
          answer_index: index,
          url: url,
          color: 'blue',
          onImageFinish: async (path: string) => {
            handleImage({ uq_id: props.users_question.id, image: { path: path } }, index);
          }
        });
      }

    const onImageCorrecting = async (index = -1) => {
        console.log("onImageCorrecting")
        const { navigation, users_question } = props;
        var url = users_question.get_image_answer_path_by_index(index)
        navigation.push('CorrectingAnswerScreen', {
          users_question: props.users_question,
          answer_index: index,
          url: url,
          color: 'red',
          onImageFinish: async (path: string) => {
            handleImage({ uq_id: props.users_question.id, image: { path: path } }, index, true);
          }
        });
      }

     const  onTextAnswer = async (text = '') => {
        const { navigation } = props;
        // Alert.alert("onTextAnswer");
        navigation.push('TextAnswerScreen', {
          users_question: props.users_question,
          value: props.users_question.answer.writing,
          onFinish: (ans_text: string) => {
            // console.log(ans_text);
            // Alert.alert(ans_text)
            // this.setState({ uploading: true })
            // forceUpdate()
            try {
              props.users_question.answer.writing = ans_text;
              // console.log(this.props.users_question);
              UsersQuestionService.save_to_server(props.users_question);
              update_users_paper_for_local_use()
            } catch (e) {
              console.log(e)
              alert("Upload failed, sorry :(");
            } finally {
            //   this.setState({ uploading: false });
            }
          }
        })
      }

     const handleImage = async (data: any, index = -1, correcting = false) => {
        // index == -1 代表 addImage
        if (data.uq_id == props.users_question.id) {
        //   this.setState({ uploading: true })
          try {
            const uploadUrl = ""
            // const uploadUrl = await new UploadFileApi().uploadFile(data.image.path, "/users_papers/" + props.users_paper.id);
            if (correcting) {
              // console.log(correcting)
              // console.log(uploadUrl)
              props.users_question.set_image_data_to_correction_with_index(uploadUrl, index)
            } else {
              props.users_question.set_image_data_to_answer_with_index(uploadUrl, index)
            }
            UsersQuestionService.save_to_server(props.users_question);
            update_users_paper_for_local_use()
          } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
          } finally {
            // this.setState({ uploading: false });
          }
        }
      }

     const update_users_paper_for_local_use = () => {
        props.users_paper.users_questions.forEach((puq: any, index: any) => {
          if (puq.id == props.users_question.id) {
            props.users_paper.users_questions[index] = props.users_question
          }
        });
        props.update_ui()
      }

     const onMcAnswer = () => {
        const { users_question } = props;
        // this.setState({ mcPicker_visible: true })
      }
     const onRemovingAnswer = async (index: number) => {
        props.users_question.answer.remove_image_data_from_writing_with_index(index);
        UsersQuestionService.save_to_server(props.users_question);
        update_users_paper_for_local_use()
        // this.setState({ refresh: true })
      }
    
     const onRemovingCorrection = async (index: number) => {
        props.users_question.correction.remove_image_data_from_writing_with_index(index);
        UsersQuestionService.save_to_server(props.users_question);
        update_users_paper_for_local_use()
        // this.setState({ refresh: true })
      }

     const  handleErrorRemark = (remark = '') => {
        // this.setState({ remark: remark })
        props.users_question.remark = remark
        UsersQuestionService.save_to_server(props.users_question);
        update_users_paper_for_local_use()
      }
      
     const videoTapeText = () => {
        if (props.paper_page['tape'])
          return t.do('exam_all.play_text') + " (1)"
        else
          return t.do('exam_all.play_text') + " (0)"
      }
    
      const  videoMandarinTapeText = () => {
        if (props.paper_page['mandarin_tape'])
          return t.do('exam_all.play_text') + " (2)"
        else
          return t.do('exam_all.play_text') + " (0)"
      }

    const uploadImageView = () => {
        return (
            <div className="mt-8 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        )
    }
    return (
        <li id={'paper_'+props.paper_page.paper_pageable_id} key={props.paper_page.id} className="bg-white shadow overflow-hidden   sm:rounded-md">            
            <div className='bg-indigo-600  px-2 py-2 flex flex-row justify-between  items-center'>
                <label className='text-white'>
                    {
                        props.paper_page['paper_pageable_type'] == PaperPageableType.Question ? t.do('exam_all.question') : t.do('exam_all.extra_question')
                    }
                    {'  '}
                    {props.paper_page.paper_pageable_type == PaperPageableType.MediaPage ? 'M'+props.mIndex : 'Q'+props.qIndex }
                </label>
                <label className='text-white'>
                    {
                        props.paper_page['paper_pageable_type'] == PaperPageableType.Question && props.paper_page['kind'] == 'mc' ? t.do('exam_all.choice_question') : ''
                    }

                    {/* {props.paper_page.paper_pageable_type == PaperPageableType.MediaPage  ? '附加信息' : props.paper_page.kind == 'mc'  ? '選擇題' : ''} */}
                </label>
            </div>
            <img src={props.paper_page.content}/>
            {/* <MyLine/> */}
            <div className='flex w-full justify-end p-2'>
                {props.paper_page.paper_pageable_type == PaperPageableType.Question ?
                    props.edit_mode == UsersPaperEditMode.user_edit_mode ?  
                        <div>
                            <label>{t.do('exam_all.score')}:{props.paper_page.score}</label>
                        </div>
                    : 
                    <div>
                        <label>{t.do('exam_all.goal')}</label>
                        <label className=' text-red-500'>{0}</label>
                        <label>{' / '}{props.paper_page.score}</label>
                    </div>
                
                : 
                <div>
                    {props.paper_page['tape'] && <QuestionActionButton title={videoTapeText()} onPress={()=>alert('tape')}/>}
                    {props.paper_page['mandarin_tape'] && <QuestionActionButton title={videoMandarinTapeText} onPress={()=>alert('mandarin_tape')}/>}
                </div>}
            </div>
            <MyLine/>
            {
                props.paper_page.paper_pageable_type == PaperPageableType.Question ?
                <MyAnswerView
                    users_question={props.users_question}
                    paper_page={props.paper_page}

                    onImageAnswer={onImageClick}
                    onTextAnswer={onTextAnswer}
                    onMcAnswer={onMcAnswer}
                    onCorrectingAnswer={onImageClick}
                    onRemovingAnswer={onRemovingAnswer}
                    onRemovingCorrection={onRemovingCorrection}
                    handleErrorRemark={handleErrorRemark}
                    edit_mode={props.edit_mode}

                />
              : null
            }
            

            {props.paper_page.paper_pageable_type == PaperPageableType.Question && props.edit_mode == UsersPaperEditMode.user_edit_mode ?
                uploadImageView()
            :null}
        </li>
    )
}