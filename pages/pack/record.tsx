import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import axiosInstance from "../../helper/axiosInstance";
import useSWRInfinite from "swr/infinite";
import LoadMore from "../../components/LoadMore";
import { useRouter } from "next/router";
import React from "react";
import Tiku from "../../models/Tiku";
import { map } from "lodash";
import PaperQuestionView from "../../components/pack/paperQuestionView";

export default function Record() {
    const router = useRouter();
    const [value, setValue] = useState('')
    const token = router.query.access_token || "X7msRyi7MLDJPjg59gS3"
    const conceptmap_id = router.query.conceptmap_id || 5

    const fetcherAll = (url: string) => fetch(url,{ 
        headers: { Authorization: "Bearer " + token} 
    }).then(async (res: any) => { 
        var data = await res.json()
        return data.doc.user_tikus
    });

    const getKey = (index: any, previousPageData: any) => {
        if (previousPageData && !previousPageData.length) return null
        return `https://www.examhero.com/api/user_tikus/records?concept_id=562&count=${PAGE_SIZE}&page=${index+1}`
    }

    const { data , error,size, setSize } = useSWRInfinite(
        getKey,    
        fetcherAll
    );

    const fetcherCorrect = (url: string) => fetch(url,{ 
        headers: { Authorization: "Bearer " + token} 
    }).then(async (res: any) => { 
        var data = await res.json()
            return data.doc
    });

    React.useEffect(() => {
        if( data ) console.log(data);
        
      }, [data]);

   const PAGE_SIZE = 10;
   const user_tikus = data ? [].concat(...data) : [];
   
   const isLoadingInitialData = !data && !error;
   const isLoadingMore =
       isLoadingInitialData ||
       (size > 0 && data && typeof data[size - 1] === "undefined");
   const isEmpty = data?.[0]?.length === 0;
   const isReachingEnd =
       isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    const select = (value: string) => {
        setValue(value)
    }

    const searchValue = (e: any) => {
        console.log(e.target.value);
        
    }

    const inputKeyUp = (e: any) => {
        if(e.keyCode===13){
            //调用和提交按钮同样的方法
            alert(e.target.value)
        }
    }

    const searchView = () => {
        return (
            <div className="w-full">
                <input type={'text'} onChange={searchValue} onKeyUp={inputKeyUp} placeholder="Search" className="w-full bg-gray-500 py-2 px-4 rounded-full border-transparent text-white "/>
            </div>
        )
    }
    const selectView = () => {
        return (
            <RadioGroup value={value} onChange={select} className="w-full relative mt-2 z-0 inline-flex shadow-sm rounded-md">
                {/* { options.map(item => (
                    <RadioGroup.Option
                        key={item.value}
                        value={item.value}
                        className={({ active, checked }) =>
                        classNames(
                            checked ? 'bg-blue-500 text-white' : 'bg-white text-gray-700',

                            'relative flex-1 justify-center inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300  text-sm font-medium  '
                        )}
                    >
                        <RadioGroup.Label as="p">{item.label}</RadioGroup.Label>
                    </RadioGroup.Option>
                ))} */}
                
                <RadioGroup.Option
                        key={''}
                        value={''}
                        className={({ active, checked }) =>
                        classNames(
                            checked ? 'bg-blue-500 text-white' : 'bg-white text-gray-700',
                            'flex-1 justify-center cursor-pointer relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium '
                        )}
                    >
                    <RadioGroup.Label as="p">{'All'}</RadioGroup.Label>
                </RadioGroup.Option>

                <RadioGroup.Option
                        key={'collection'}
                        value={'collection'}
                        className={({ active, checked }) =>
                        classNames(
                            checked ? 'bg-blue-500 text-white' : 'bg-white text-yellow-500',
                            '-ml-px flex-1 cursor-pointer justify-center relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium '
                        )}
                    >
                    <RadioGroup.Label as="p">{'收藏'}</RadioGroup.Label>
                </RadioGroup.Option>
                <RadioGroup.Option
                        key={'correct'}
                        value={'correct'}
                        className={({ active, checked }) =>
                        classNames(
                            checked ? 'bg-blue-500 text-white' : 'bg-white text-green-500',
                            '-ml-px flex-1 cursor-pointer justify-center relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium  '
                        )}
                    >
                    <RadioGroup.Label as="p">{'正確'}</RadioGroup.Label>
                </RadioGroup.Option>
                <RadioGroup.Option
                        key={'mistake'}
                        value={'mistake'}
                        className={({ active, checked }) =>
                        classNames(
                            checked ? 'bg-blue-500 text-white' : 'bg-white text-red-500 ',
                            '-ml-px flex-1 cursor-pointer justify-center relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium '
                        )}
                    >
                    <RadioGroup.Label as="p">{'錯誤'}</RadioGroup.Label>
                </RadioGroup.Option>
            </RadioGroup> 
        )
    }

    const _renderItem = (item: any, index: number) => {
        return (
            <li key={index} className="border rounded-xl mt-2 cursor-pointer bg-white">

                <div className="px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-900">{item.major + ' - ' + item.name}</p>
                    </div>
                    <div className='flex flex-row'>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                </div>
            </li>
        )
    }

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
      }

    return (
        <div className="w-full items-center flex justify-center">
            <div className="max-w-screen-lg w-full bg-white overflow-hidden px-4 py-4">
                {/* {searchView()} */}
                {selectView()}
                <nav className="mt-2 max-w-screen-lg w-full h-full rounded-sm overflow-y-auto" aria-label="Directory">
                    <ul role="list" className="">
                        {user_tikus?.map((item: Tiku, index) => (
                           <PaperQuestionView key={index} index={index+1} tiku={item} selectAnswer={()=>{}}/>
                        ))}
                    </ul>
                </nav>
                <LoadMore
                    disabled = {isLoadingMore || isReachingEnd}
                    loadMoreData={() => setSize(size + 1)}
                    isLoadingMore = {isLoadingMore}
                    isReachingEnd = {isReachingEnd}
                    />

            </div>
        </div>
    )
}