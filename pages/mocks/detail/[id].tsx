import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../../components/header';
import PaperService from '../../services/paper_service';
import LastMock from '../../../models/LastMock';
import Bar from '../../components/bar';

export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

export default function detail() {
    const router = useRouter();
    const [id, setId] = React.useState(0);
    const [paper, setPaper] = React.useState<LastMock>()
    
    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        if( router.query.id ){
            PaperService.papers_can_do(parseInt( router.query.id.toString())).then((doc:any) => {
                console.log(doc);
                setPaper(doc)
            })
        }
    }
    const handleClick = () => {
      router.push('/mocks/UsersPaperScreen')
    }

      return (
        <>
        <Header/>
        <div className='w-full'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
            <div className="w-9/12 bg-white shadow overflow-hidden sm:rounded-lg">
              <Bar/>
              <div className="-ml-4 -mt-4 px-4 py-5  flex justify-between items-center flex-wrap sm:flex-nowrap">
                <div className="ml-4 mt-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{paper?.description || '-'}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
                  </p>
                </div>
                <div className="ml-4 mt-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    開始做卷
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">用途</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.title || '-'}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">課程</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.examination?.name || '-'}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">科目</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.curriculum?.name || '-'}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">題目數量</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.total_questions || '-'}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">所需時間</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.suggest_time || '-'} 分鐘</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">總分</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.max_score || '-'} 分</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">所用時間</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.max_score || '-'}</dd>
                  </div>

                </dl>
              </div>
            </div>
          </div>
        </div>
        </>
      )
}