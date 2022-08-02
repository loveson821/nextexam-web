import { ChevronRightIcon } from '@heroicons/react/outline';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Book from '../../models/Book';
import Chapter from '../../models/chapter';
import Group from '../../models/Group';
import Section from '../../models/section';
import Bar from '../../components/bar';
import MyZoomImage from '../../components/MyZoomImage';
import { useServices } from '../../services';
import EbookService from '../../services/ebook_services';
import useSWR from "swr";
import Loading from "../../components/Loading";
import MyModal from '../../components/MyModal';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom'
// export async function getServerSideProps ({ query }: any) {
//     const book_id = 20
//     const res = await fetch(`https://www.examhero.com/api/books/${book_id}.json`, { 
//         method: 'get', 
//         headers: new Headers({
//           'Authorization': 'Bearer X7msRyi7MLDJPjg59gS3', 
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }), 
//       })
//     const posts = await res.json()

//     return { props: { posts: posts, id: query.id} }
// }

export async function getServerSideProps(context: any) {
    // console.log(context);
    return {
        props: {
            id: context.query.id
        }, // will be passed to the page component as props
    }
}


//   const index: NextPage = () => {
const Detail: NextPage = (props: any) => {
    const router = useRouter();
    const { t } = useServices();
    const [id, setId] = React.useState(props.id);
    const [book, setBook] = useState<Book>();
    const [group, setGroup] = useState<Group>();
    const [visable, setVisable] = useState(false)
    const [description, setDescription] = useState('')
    const pages = [
        { name: '電子書', href: '/ebooks/groups', current: true },
        { name: router.query.book_name, href: '#', current: true }
    ]

    const { data, error } = useSWR(`books/${id}.json`, () => EbookService.detail(id))

    useEffect(() => {
        // loadData();
        if (data) {
            setBook(data as Book)
            setGroup((data as Book).group)
        }
    }, [data]);

    const loadData = () => {
        EbookService.detail(id).then((doc: any) => {
            if (doc) {
                // console.log(doc);
                setBook(doc)
                setGroup(doc.group)
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })
    };
    const sectionClick = (section: Section) => {
        // if (group != null
        //     && (group.vpass != null
        //         && group.vpass.invalid_date != null
        //         && moment(group.vpass.invalid_date).isAfter(moment().format("YYYY-MM-DD")))
        // ){
        //     return ;

        // }

        if (section.premium) {
            setVisable(true)
            setDescription("請下載【考試英雄】App進行訂閱和閲讀~")
        } else {
            window.open(section.pdf_url + "")
        }
    }

    const cancelClick = () => {
        setVisable(false)
    }
    const confirmClick = () => {
        setVisable(false)
    }

    return (
        <>
            <div className='max-w-screen-lg w-full'>
                <Loading visable={!data} />
                <Bar pages={pages} />
            </div>
            <div className='max-w-screen-lg w-full p-2  m-4 flex flex-row '>
                <div className="w-40 rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 hover:opacity-75">
                    <MyZoomImage url={book?.cover} className='w-full h-full object-center object-cover' width={200} height={300} layout="intrinsic" />
                </div>

                <div className='ml-4'>
                    <p className=' text-lg font-bold'>{book?.name || ''}</p>
                    <p className='mt-2 text-sm'>{book?.description || ''}</p>
                </div>
            </div>
            <nav className="max-w-screen-lg w-full h-full border rounded-sm overflow-y-auto" aria-label="Directory">
                {book?.chapters?.map((chapter: Chapter) => (
                    <div key={chapter.id} className="">
                        <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                            <h3>{chapter.title}</h3>
                        </div>
                        <ul role="list" className="z-0 divide-y divide-gray-200">
                            {chapter.sections?.map((section: Section) => (
                                <li key={section.id} onClick={() => sectionClick(section)} className=" cursor-pointer bg-white">
                                    <div className="px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{section.title}</p>
                                        </div>
                                        <div className='flex flex-row'>
                                            {
                                                section.premium ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    VIP
                                                </span> : ""
                                            }
                                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
            <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description} />
        </>
    )
}
export default Detail