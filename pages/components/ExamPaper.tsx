import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import { useServices } from '../services';

type ExamPaperProps = {
    role: string,
    paper: any;
}
export const ExamPaper: React.FC<ExamPaperProps> = ({role,paper}: ExamPaperProps) => {
    const { t } = useServices();
    const [data, setData] = useState({
           title:       paper.examination.name + " " + paper.curriculum.name + " " + paper.title,
           description: "-" + paper.description + " - ",
           status: '',
            doTime: t.do('exam_status.finish')
    })
    React.useEffect(() => {
        var status = ''
        var doTime = ''
        paper.status == 'doing' ? status = t.do('exam_status.doing') :
        paper.status == 'correcting' ? status = t.do('exam_status.wait_correction') :
        paper.status == 'submited' ? status = t.do('exam_status.wait_correction') : 
        paper.status == 'done' ? status = paper.score : status = t.do('exam_status.none');
    
        if(  paper.submited_at && paper.deadline && moment(paper.submited_at).isAfter(paper.deadline) )
            status = status + "( " + t.do('exam_detail.deadline')+ " )"
        if ( paper.status == 'done' && paper.submited_at && paper.deadline && moment(paper.submited_at).isAfter(paper.deadline))
            status = paper.score + "( " + t.do('exam_detail.deadline')+ " )"

          
        if( paper.status == 'done' )
            doTime = t.do('exam_status.finish')
        else if( paper.can_start_at && moment(paper.can_start_at).isAfter(moment().format("YYYY-MM-DD HH:mm")) )
            doTime = moment(paper.can_start_at).format("MM-DD HH:mm") + " " + t.do('general.start')
        else if( paper.can_start_at && paper.deadline && moment(paper.can_start_at).isBefore(moment().format("YYYY-MM-DD HH:mm")) && moment(paper.deadline).isAfter(moment().format("YYYY-MM-DD HH:mm")))
            doTime = moment(paper.deadline).format("MM-DD HH:mm") + " " + t.do('general.end')
        else if( paper.deadline &&   moment(paper.deadline).isBefore(moment().format("YYYY-MM-DD HH:mm")) )
            doTime = t.do('exam_status.past')

        setData({
            ...data,
            doTime: doTime,
            status: status
        })
    },[paper])
    const handleClick = () => {
        navigation.navigate('PaperDetailScreen', { paper_id: paper.id , title: paper.description, role:role })
    }
    return (
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/mocks/detail/${paper.id}`}>
                <div className=' cursor-pointer'>
                    <a  className=' cursor-pointer'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{paper.description}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{paper.examination.name} - {paper.curriculum.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.status}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {
                            role == 'owner' || role == "moderator"
                            ? paper.item.submited_count + " " + t.do('exam_detail.submit_times')
                            : ""
                        }
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {data.doTime}
                    </p>
                </div>
            </Link>
            <a href="" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                開始做卷
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" ></path></svg>
            </a>
        </div>
    )
}