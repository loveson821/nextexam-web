import { Router, useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import Book from '../../models/Book';
import Group from '../../models/Group';
import Footer from '../components/footer';
import Header from '../components/header'
import { useServices } from '../services';
import EbookService from '../services/ebook_services';


export default function index() {
    const { t } = useServices();
    const [group, setGroup] = useState<Group>();
    const router = useRouter();
    const [data, setData] = useState([]);
    React.useEffect(() => {
        loadData();
      }, []);

    const loadData = () => {
        var group_id = 68;
        EbookService.list(group_id).then((docs: any) => {
            if (docs) {
                console.log(docs);
                setData(docs)
            }
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
        })
    };

  const detailClick = (book:Book) => {
    router.push('/ebooks/'+book.id)
  }

  return (
    <div className=' min-h-screen h-full relative'>
    <Header/>
    <div className='w-full pb-40'>
    <div className='flex flex-col w-full pt-2 justify-center items-center'>
        <div className="max-w-screen-lg w-full -mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((book: Book) => (
            <div  key={book.id} onClick={() => detailClick(book)} className="group cursor-pointer p-4 border-r border-b border-gray-200 sm:p-6">
              <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                  src={book.cover}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
               
                    <span aria-hidden="true" className="absolute " />
                    {book.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
