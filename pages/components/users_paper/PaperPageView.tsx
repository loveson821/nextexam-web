import React, { useState } from 'react';
import _ from 'lodash';
import { PaperPageableType, UsersPaperEditMode } from '../../../utils/enums';
import MyAnswerView from './MyAnswerView';
import QuestionActionButton from './QuestionActionButton';
import MyLine from '../MyLine';
import { useServices } from '../../services';

export default function PaperPageView(props: any) {
    const { t } = useServices();
    React.useEffect(() => {
      }, []);
    
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
                    {props.paper_page.paper_pageable_type == PaperPageableType.MediaPage ? 'M'+props.mIndex : 'Q'+props.qIndex }
                </label>
                <label className='text-white'>
                    {props.paper_page.paper_pageable_type == PaperPageableType.MediaPage  ? '附加信息' : props.paper_page.kind == 'mc'  ? '選擇題' : ''}
                </label>
            </div>
            <img src={props.paper_page.content}/>
            <MyLine/>
            {props.paper_page.paper_pageable_type == PaperPageableType.Question ?
                 props.edit_mode == UsersPaperEditMode.user_edit_mode ?  
                    <div>
                        <label>分數:{props.paper_page.score}</label>
                    </div>
                 : 
                 <div>
                    <label>分數:{props.paper_page.score}</label>
                </div>
               
            : 
            <div>
                {props.paper_page['tape'] && <QuestionActionButton title={videoTapeText()} onPress={()=>alert('tape')}/>}
                {props.paper_page['mandarin_tape'] && <QuestionActionButton title={videoMandarinTapeText} onPress={()=>alert('mandarin_tape')}/>}
            </div>}
            <MyLine/>
            {
                props.paper_page.paper_pageable_type == PaperPageableType.Question ?
                <MyAnswerView
                users_question={props.users_question}
                paper_page={props.paper_page}

                // onImageAnswer={this.onImageClick.bind(this)}
                // onTextAnswer={this.onTextAnswer.bind(this)}
                // onMcAnswer={this.onMcAnswer.bind(this)}
                // onCorrectingAnswer={this.onImageClick.bind(this)}
                // onRemovingAnswer={this.onRemovingAnswer.bind(this)}
                // onRemovingCorrection={this.onRemovingCorrection.bind(this)}
                // handleErrorRemark={this.handleErrorRemark.bind(this)}
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