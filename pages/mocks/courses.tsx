import { ChevronRightIcon } from "@heroicons/react/outline";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Course from "../../models/Course";
import Curriculum from "../../models/Curriculum";
import Group from "../../models/Group";
import Bar from "../components/bar";
import Footer from "../components/footer";
import Header from "../components/header";
import MocksService from "../services/mocks_services";



export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

  const courses: NextPage = () => {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [group_id] = useState( parseInt( router.query.group_id+""))
    const pages = [
        { name: '模擬試', href: '/mocks/groups', current: true },
        { name:  router.query.group_name, href: '#', current: true },
        { name:  "選擇科目", href: '#', current: true }
      ]

    React.useEffect(() => {
        loadData();
      }, []);
      const loadData = () => {
        MocksService.courses(group_id).then((docs: any) => {
            console.log("docs: ", docs);

            if( docs )
                setCourses(docs)
            
        }).catch((error) => {
            console.error(error);
        })
    }
    const handleClick = (course_id?: number, curriculum?: Curriculum) => {
        router.push({
            pathname: '/mocks', 
            query:{
                course_id: course_id, 
                curriculum_id: curriculum?.id,
                curriculum_name: curriculum?.name,
                group_id: group_id,
                group_name: router.query.group_name
            }})
    }
    return (
      <div className=' min-h-screen h-full relative'>
      <Header/>
      <div className='w-full pb-40'>
        <div className='flex flex-col w-full pt-2 justify-center items-center'>    
            <div className=" max-w-screen-lg w-full">
                <Bar pages={pages}/>
                <nav className="mt-2 max-w-screen-lg w-full h-full border rounded-sm overflow-y-auto" aria-label="Directory">
                    {courses?.map((course: Course) => (
                        <div key={course.id} className="">
                        <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                            <h3>{course.name}</h3>
                        </div>
                        <ul role="list" className="z-0 divide-y divide-gray-200">
                            {course.related_curriculums && course.related_curriculums[0]?.curriculums?.map((curriculum: Curriculum, index) => (
                            <li key={curriculum.name} className=" cursor-pointer bg-white">
                               
                                <div onClick={()=>handleClick(course.id, curriculum)} className="px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
        </div>
        </div>
        <Footer/>
    </div>
    )
  }
  export default courses