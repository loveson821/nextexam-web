import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Book from '../../models/Book';
import Group from '../../models/Group';
import Bar from '../components/bar';
import { useServices } from '../services';
import EbookService from '../services/ebook_services';
import useSWR from "swr";
import Loading from "../components/Loading";
import Image from 'next/image';

export async function getServerSideProps(context: any) {
  // console.log(context);
  return {
    props: {
    }, // will be passed to the page component as props
  }
}

export default function Index() {
  const { t } = useServices();
  const [group, setGroup] = useState<Group>();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [group_id, setId] = React.useState(parseInt(router.query.group_id + ""));
  const pages = [
    { name: '電子書', href: '/ebooks/groups', current: true },
    { name: router.query.group_name, href: '#', current: true }
  ]

  const { data, error } = useSWR(`books_${group_id}.json`, () => EbookService.list(group_id))

  React.useEffect(() => {
    var docs: any = data
    setBooks(docs)
  }, [data]);
  // React.useEffect(() => {
  //   loadData()
  // }, []);
  // const loadData = () => {
  //     EbookService.list(group_id).then((docs: any) => {
  //         if (docs) {
  //             console.log(docs);
  //             setBooks(docs)
  //         }
  //     }).catch((error) => {
  //         console.error(error);
  //     }).finally(() => {
  //     })
  // };

  const detailClick = (book: Book) => {
    router.push({
      pathname: '/ebooks/' + book.id, query: {
        'book_name': book.name
      }
    })
  }

  return (
    <>
      <div className='max-w-screen-lg w-full'>
        {/* <Loading visable={!data} /> */}
        <Bar pages={pages} />
      </div>
      <div className="max-w-screen-lg w-full -mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {books?.map((book: Book) => (
          <div key={book.id} onClick={() => detailClick(book)} className="group cursor-pointer p-4 border-r border-b border-gray-200 sm:p-6">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
              <Image
                src={book.cover || ''}
                width={200}
                height={300}
                layout="responsive"
                className="w-full h-full object-center object-cover"
                alt=''
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
    </>
  )
}
