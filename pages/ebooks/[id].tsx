import { ChevronRightIcon } from '@heroicons/react/outline';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Book from '../../models/Book';
import Chapter from '../../models/Chapter';
import Section from '../../models/section';
import Footer from '../components/footer';
import Header from '../components/header';
import MyModal from '../components/MyModal';
import { useServices } from '../services';
import EbookService from '../services/ebook_services';

export async function getServerSideProps () {
// Pass data to the page via props
return { props: { } }
}

export default function detail() {
    const router = useRouter();
    const {t} = useServices();
    const [id, setId] = React.useState(parseInt(router.query.id+""));
    const [book, setBook] = useState<Book>();
    const [visable, setVisable] = useState(false)

    React.useEffect(() => {
        loadData();
      }, []);

    const loadData = () => {
        EbookService.detail(id).then((doc: any) => {
            if (doc) {
                console.log(doc);
                setBook(doc)
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })
    };
    const sectionClick = (section: Section) => {
        if( section.premium ) setVisable(true)
    }

    const cancelClick = () => {
        setVisable(false)
    }
    const confirmClick = () => {
        setVisable(false)
    }

    return (
        <div className=' min-h-screen h-full relative'>
            <Header/>
            <div className='w-full pb-40'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
                <div className='max-w-screen-lg w-full p-2  m-4 flex flex-row '>
                    <div className="w-40 rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 hover:opacity-75">
                        <img
                        src={book?.cover}
                        className="w-full h-full object-center object-cover"
                        />
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
                            <li key={section.id} onClick={()=>sectionClick(section)} className=" cursor-pointer bg-white">
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
                </div>
            </div>
            <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={ t.do('ebook.need_subscription')}/>
            <Footer/>
        </div>
    )
}