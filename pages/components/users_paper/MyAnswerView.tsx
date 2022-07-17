import React, { useState } from 'react';
import _ from 'lodash';
import { UsersPaperEditMode } from '../../../utils/enums';
import { UsersQuestion } from '../../../models';
import { useServices } from '../../services';
import MyLine from '../MyLine';
import { MailIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { RadioGroup } from '@headlessui/react';
import MyInfoInputModal from '../MyInfoInputModal';

export default function MyAnswerView(props: any) {
    const { t } = useServices();
    const [num, setNum] = useState(0)
    const [visable, setVisable] = useState(false)
    const [value, setValue] = useState('')
    const [data, setData] = useState({
      title: '',
      type: '',
      remark: props.users_question.remark,
      proof: props.users_question.proofread,
    })

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

      const removeAnswer = (index: number) => {
        props.onRemovingAnswer(index)
      }
    
      const removeCorrection = (index: number) => {
        props.onRemovingCorrection(index)
      }

      
      /**
       * 顯示學生答案圖片
       * @param url 
       * @param index 
       * @returns 
       */
      const student_view = (url: string, index: number) => {
        return (
            <div className='group' key={index}>
              <div className='flex justify-end relative'>
                {isAnswering() && 
                  <button
                      type="button"
                      onClick={()=> removeAnswer(index)}
                      className="invisible group-hover:visible m-2 inline-flex items-center absolute top-0 px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    {t.do('general.delete')}
                  </button>
                }
               
              </div>
              <img className=' cursor-pointer' src={url} onClick={() => { onEditAnswer(index) } }/>
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
      
    
      function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }
      const memoryOptions = [
        "A","B","C","D","E"
      ]
      
      
      const [mcValue, setMcValue] = useState(props.users_question.answer.writing || '')
      /**
       * 顯示學生答案-選擇題答案
       * @returns 
       */
      const show_mc_answer = () => {
        
       
        const select = (value: any) => {
          if( isCorrecting() ) return ;
          console.log(value);
          setMcValue(value)
          onEditAnswer(value)
          // setNum(num => num++)
        }
        return (
          <div className='w-full flex py-10 justify-center items-center'>

            <RadioGroup value={mcValue} onChange={select} className="mt-2">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {memoryOptions.map((option) => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    className={({ active, checked }) =>
                      classNames(
                        // option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                        // active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                        checked
                          ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                        'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                      )
                    }
                  >
                    <RadioGroup.Label as="p">{option}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            {/* <span className=' text-gray-500'>{props.users_question.answer.writing}</span> */}
          </div>
        )
      }

      /**
       * 顯示改卷答案-選擇題
       * @param index 
       */
      const correcting_mc_view = (index: number) => {
        const uq = props.users_question
        return (
          <div key={index}>
            <div className=''>
              <label className='px-3 bg-white text-lg font-medium text-gray-900'>{t.do('exam_all.compare_answer')}</label>
            </div>
            <div className='w-full flex py-10 justify-center items-center'>
            <RadioGroup value={uq.question.compare_answer} onChange={()=>{}} className="mt-2">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {memoryOptions.map((option) => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    className={({ active, checked }) =>
                      classNames(
                        // option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                        // active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                        checked
                          ? 'bg-green-600 border-transparent text-white hover:bg-green-700'
                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                        'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                      )
                    }
                  >
                    <RadioGroup.Label as="p">{option}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

              {/* <label>{uq.question.compare_answer}</label> */}
            </div>
          </div>
        )
      }
      /**
       * 顯示改卷答案-文字
       * @param index 
       */
      const correcting_text_view = (index: number) => {
        const uq = props.users_question
        return (
          <div key={index}>
            <div className=' min-h-[100] items-center justify-center'>
              <label>{uq.answer.writing}</label>
            </div>
          </div>
        )
      }
      /**
       * 顯示改卷答案-圖片
       * @param url 
       * @param index 
       */
      const correcting_image_view = (url: string, index: number) => {
        return (
          <div className=' group bg-black' key={index}>
              <div className='flex relative justify-end '>
                <button
                    type="button"
                    onClick={()=> onEditAnswer(index)}
                    className="invisible group-hover:visible m-2 absolute inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  <PencilAltIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  {t.do('exam_all.correction')}
                </button>
              </div>
    
            { props.users_question.hasCorrectionOnIndex(index) && 
              <div className=''>
                <div className=' relative'>
                  <button
                      type="button"
                      onClick={()=> removeCorrection(index)}
                      className="invisible group-hover:visible absolute m-2 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    <PencilAltIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                    {t.do('exam_all.rewriting')}
                  </button>
                </div>
                <div onClick={() => { onEditAnswer(index) }}>
                  <img src={props.users_question.correction_on_index(index)} />
                </div>

              </div>
            }
    
            { !props.users_question.hasCorrectionOnIndex(index) && 
              <div onClick={() => { onEditAnswer(index) }}>
                <img src={url} />
              </div>
            }
          </div>
        )
      }
      /**
       * 顯示學生答案
       * @returns 
       */
      const show_answer = () => {
        // console.log("myanswerview show_answer")
        const uq = new UsersQuestion(props.users_question)
        if( uq.question?.isMC() ){
          return show_mc_answer()
        }else{
          if (uq.answer?.isText()) {
            return show_text_answer()
          }else{
            return show_image_answer()
          }
        }
        // if (uq.answer?.isText()) {
        //   if (uq.question?.isMC()) {
        //     return show_mc_answer()
        //   } else {
        //     return show_text_answer()
        //   }
        // } else {
        //   return show_image_answer()
        // }
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

      const onEditAnswer = (index?: number) => { 

        if( isShowOnly() ) return ;
        // 是否 mc
        const uq = new UsersQuestion(props.users_question)
        if (uq.question?.isMC() && !isAnswering())
          return;
        else if (uq.question?.isMC()) {
          return props.onMcAnswer(index)
        } else {
          // Alert.alert('is not MC')
          // return
        }
    
        // 判斷 user 用緊乜野答問題，要分開返係圖片定文字，調用返唔同的 callback，所有邏輯處理去返 paper page view 做
        if (props.users_question?.hasAnswer()) {
          if (props.users_question.answer.isText()) {
            return props.onTextAnswer()
          } else {
            return props.onImageAnswer(index)
          }
        }
      }

      const show_edit_error = () => {
        return (
          <div className="p-3">
            <div  onClick={()=>{
               setData({
                ...data,
                title: '錯什麼?',
                type: 'errors',
              })
              setValue(data.remark)
              setVisable(true)
              }} className="cursor-pointer bg-white text-lg font-medium text-gray-900">
                <span className=' text-red-500 underline'>
                  {t.do('exam_all.errors')}
                </span>
            </div>
            <span className='m-6 text-red-500 text-sm'>
              {props.users_question.remark || '無'}
            </span>
        </div>
        )
      }

      const show_edit_proof = () => {
        return (
          <div className="p-3">
            <div  onClick={()=>{
              setData({
                ...data,
                title: '查核留言',
                type: 'proof'
              })
              setValue(data.proof)
              setVisable(true)
              }} className="cursor-pointer bg-white text-lg font-medium text-gray-900">
                <span className=' text-red-500 underline'>
                  {t.do('exam_all.proofread_text')}
                </span>
            </div>
            <span className='m-6 text-red-500 text-sm'>
              {props.users_question.proofread || '無'}
            </span>
        </div>
        )
      }

      const onHandleError = (type: any, value: string) => {
        setVisable(false)
        switch (type) {
          case 'errors':
            setData({
              ...data,
              remark: value
            })
            props.handleErrorRemark(value)
            break;
          case 'proof':
            setData({
              ...data,
              proof: value
            })
            props.handleProofRemark(value)
          default:
            break;
        }
       
      }
      const cancelClick = () => {
        setVisable(false)
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
          {!props.users_question?.hasAnswer() && !props.users_question?.isMC() &&
            <div className='w-full flex py-10 justify-center items-center'>
              <span className=' text-gray-500'>{t.do('exam_all.none_answer')}</span>
            </div>
          }
          {(props.users_question?.hasAnswer() && (isAnswering() || isShowOnly() ) || props.users_question?.isMC())  &&
              show_answer()
          }
          {props.users_question?.hasAnswer() && isCorrecting() &&
            <div>
              {props.users_question?.answer?.writing?.split(",").map((url: string, index: number) => {
                return teacher_view(url, index)
              })}
            </div>
          }

          {isCorrecting() && show_edit_error()}
          {isProofing() && show_edit_proof()}

          </div>
          <MyInfoInputModal visable={visable} cancelClick={cancelClick} confirmClick={onHandleError} value={value} title={data.title} type={data.type}/>
        </>
    )
}