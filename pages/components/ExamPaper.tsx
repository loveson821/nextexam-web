import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { useServices } from '../services';

export default function ExamPaper(props: any) {
    const { t } = useServices();
    const [data, setData] = useState({
           title:       props.paper.examination.name + " " + props.paper.curriculum.name + " " + props.paper.title,
           description: "-" + props.paper.description + " - ",
           status: '',
            doTime: t.do('exam_status.finish')
    })
    React.useEffect(() => {
        var status = ''
        var doTime = ''
        props.paper.status == 'doing' ? status = t.do('exam_status.doing') :
        props.paper.status == 'correcting' ? status = t.do('exam_status.wait_correction') :
        props.paper.status == 'submited' ? status = t.do('exam_status.wait_correction') : 
        props.paper.status == 'done' ? status = props.paper.score : status = t.do('exam_status.none');
    
        if(  props.paper.submited_at && props.paper.deadline && moment(props.paper.submited_at).isAfter(props.paper.deadline) )
            status = status + "( " + t.do('exam_detail.deadline')+ " )"
        if ( props.paper.status == 'done' && props.paper.submited_at && props.paper.deadline && moment(props.paper.submited_at).isAfter(props.paper.deadline))
            status = props.paper.score + "( " + t.do('exam_detail.deadline')+ " )"

          
        if( props.paper.status == 'done' )
            doTime = t.do('exam_status.finish')
        else if( props.paper.can_start_at && moment(props.paper.can_start_at).isAfter(moment().format("YYYY-MM-DD HH:mm")) )
            doTime = moment(props.paper.can_start_at).format("MM-DD HH:mm") + " " + t.do('general.start')
        else if( props.paper.can_start_at && props.paper.deadline && moment(props.paper.can_start_at).isBefore(moment().format("YYYY-MM-DD HH:mm")) && moment(props.paper.deadline).isAfter(moment().format("YYYY-MM-DD HH:mm")))
            doTime = moment(props.paper.deadline).format("MM-DD HH:mm") + " " + t.do('general.end')
        else if( props.paper.deadline &&   moment(props.paper.deadline).isBefore(moment().format("YYYY-MM-DD HH:mm")) )
            doTime = t.do('exam_status.past')

        setData({
            ...data,
            doTime: doTime,
            status: status
        })
    },[props.paper])
    // const handleClick = () => {
    //     navigation.navigate('PaperDetailScreen', { paper_id: paper.id , title: paper.description, role:role })
    // }
    return (
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/mocks/detail/${props.paper.id}?show_model=0&course_id=${props.course_id}`}>
                <div className=' cursor-pointer'>
                    <a  className=' cursor-pointer'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.paper.description}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.paper.examination.name} - {props.paper.curriculum.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.status}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {
                            props.role == 'owner' || props.role == "moderator"
                            ? props.paper.item.submited_count + " " + t.do('exam_detail.submit_times')
                            : ""
                        }
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {data.doTime}
                    </p>
                </div>
            </Link>
            {/* <a href="" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                開始做卷
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
            </a> */}
        </div>
    )
}