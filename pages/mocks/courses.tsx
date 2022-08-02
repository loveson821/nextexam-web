import { ChevronRightIcon } from "@heroicons/react/outline";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Course from "../../models/Course";
import Curriculum from "../../models/Curriculum";
import Bar from "../../components/bar";
import MocksService from "../../services/mocks_services";
import useSWR from "swr";
import Loading from "../../components/Loading";


export async function getServerSideProps() {
    // Pass data to the page via props
    return { props: {} }
}

const Courses: NextPage = () => {
    const router = useRouter();
    const [group_id] = useState(parseInt(router.query.group_id + ""))
    const pages = [
        { name: '模擬試', href: '/mocks/groups', current: true },
        { name: router.query.group_name, href: '#', current: true },
        { name: "選擇科目", href: '#', current: true }
    ]
    const [courses, setCourses] = useState([])
    const { data, error } = useSWR('courses/index_v' + group_id, () => MocksService.courses(group_id))

    React.useEffect(() => {
        if( data )
            setCourses(data as any)
    },[data])

    const handleClick = (course_id?: number, curriculum?: Curriculum) => {
        router.push({
            pathname: '/mocks',
            query: {
                course_id: course_id,
                curriculum_id: curriculum?.id,
                curriculum_name: curriculum?.name,
                group_id: group_id,
                group_name: router.query.group_name
            }
        })
    }
    // if( !courses ){
    //     return <Loading/>
    //   }
    return (
        <>
            <div className=" max-w-screen-lg w-full">
                <Loading visable={!courses} />
                <Bar pages={pages} />
                <nav className="mt-2 max-w-screen-lg w-full h-full border rounded-sm overflow-y-auto" aria-label="Directory">
                    {courses?.map((course: Course) => (
                        <div key={course.id} className="">
                            <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                <h3>{course.name}</h3>
                            </div>
                            <ul role="list" className="z-0 divide-y divide-gray-200">
                                {course.related_curriculums && course.related_curriculums[0]?.curriculums?.map((curriculum: Curriculum, index: number) => (
                                    <li key={curriculum.name} className=" cursor-pointer bg-white">

                                        <div onClick={() => handleClick(course.id, curriculum)} className="px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">{curriculum.name}</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    )
}
export default Courses