import React, { useState } from 'react';
import _ from 'lodash';
import { UsersPaperEditMode } from '../../../utils/enums';
import { UsersQuestion } from '../../../models';
import { useServices } from '../../services';
import MyLine from '../MyLine';

export default function MyAnswerView(props: any) {
    const { t } = useServices();
  
    React.useEffect(() => {
      }, []);

      const isAnswering = () => {
        return props.edit_mode == UsersPaperEditMode.user_edit_mode || props.edit_mode == UsersPaperEditMode.user_start_mode
      }
    
      const isCorrecting = () => {
        return props.edit_mode == UsersPaperEditMode.teacher_edit_mode
      }
    
      const isProofing = () => {
        return props.edit_mode == UsersPaperEditMode.proof_mode
      }
    
      const isShowOnly = () => {
        return props.edit_mode == UsersPaperEditMode.show_only_mode
      }
      
      /**
       * 顯示答案圖片
       * @param url 
       * @param index 
       * @returns 
       */
      const student_view = (url: string, index: number) => {
        return (
            <div key={index}>
              <img src={url} />
              <MyLine/>
            </div>
          
        )
      }
    
      /**
       * 顯示學生答案-文字答案
       * @returns 
       */
      const show_text_answer = () => {
        return (
          <div className='pl-8 pt-18'>
            <label>
              {props.users_question.answer.writing}
            </label>
          </div>
        )
      }
      
      /**
       * 顯示學生答案-圖片答案
       * @returns 
       */
      const show_image_answer = () => {
        return (
          <div
          >
            {props.users_question.answer?.writing?.split(",").map((url: string, index: number) => {
              if (url != '') {
                return student_view(url, index)
              }
            })}
          </div>
        )
      }
      
      /**
       * 顯示學生答案-選擇題答案
       * @returns 
       */
      const show_mc_answer = () => {
        return (
              <label>{props.users_question.answer.writing}</label>
  
        )
      }

      /**
       * 顯示改卷答案-選擇題
       * @param index 
       */
      const correcting_mc_view = (index: number) => {
      }
      /**
       * 顯示改卷答案-文字
       * @param index 
       */
      const correcting_text_view = (index: number) => {
      }
      /**
       * 顯示改卷答案-圖片
       * @param url 
       * @param index 
       */
      const correcting_image_view = (url: string, index: number) => {
      }
      /**
       * 顯示學生答案
       * @returns 
       */
      const show_answer = () => {
        // console.log("myanswerview show_answer")
        const uq = new UsersQuestion(props.users_question)
        if (uq.answer?.isText()) {
          if (uq.question?.isMC()) {
            return show_mc_answer()
          } else {
            return show_text_answer()
          }
        } else {
          return show_image_answer()
        }
      }

      /**
       * 顯示老師改卷答案
       * @param url 
       * @param index 
       * @returns 
       */
      const teacher_view = (url: string, index: number) => {

        if (props.users_question.isMC()) {
          return correcting_mc_view(index)
        }
    
        if (props.users_question.isText()) {
          return correcting_text_view(index)
        }
    
        if (url != '') {
          return correcting_image_view(url, index)
        }
      }

    return (
        <>
          <div key={props.users_question.id}>
          <div className="mt-4">
            <div className="">
              <span className="px-3 bg-white text-lg font-medium text-gray-900">
                  {
                    isCorrecting() ? t.do('exam_all.student_answer') : t.do('exam_all.my_answer')
                  }
              </span>
            </div>
          </div>
          {!props.users_question?.hasAnswer() &&
            <div className='w-full flex py-10 justify-center items-center'>
              <span className=' text-gray-500'>{t.do('exam_all.none_answer')}</span>
            </div>
          }
          {props.users_question?.hasAnswer() && (isAnswering() || isShowOnly() )&&
              show_answer()
          }
          {props.users_question?.hasAnswer() && isCorrecting() &&
            <div>
              {props.users_question?.answer?.writing?.split(",").map((url: string, index: number) => {
                return teacher_view(url, index)
              })}
            </div>
          }

          </div>
        </>
    )
}