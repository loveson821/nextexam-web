import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../../components/header';
import PaperService from '../../services/paper_service';
import LastMock from '../../../models/LastMock';

export async function getServerSideProps () {
    // Pass data to the page via props
    return { props: { } }
  }

export default function detail() {
    const router = useRouter();
    const [id, setId] = React.useState(0);
    const [paper, setPaper] = React.useState<LastMock>()
    
    React.useEffect(() => {
        if( router.query.id )
            setId(parseInt( router.query.id.toString()) )
        console.log("id:",router.query.id);
        if( router.query.id )
        console.log("ss",parseInt( router.query.id.toString()));
        
        loadData();
    }, []);

    const loadData = () => {
        console.log("===",id);
        if( router.query.id ){
            PaperService.papers_can_do(parseInt( router.query.id.toString())).then((doc:any) => {
                console.log(doc);
                setPaper(doc)
            })
        }
    }

      return (
        <>
        <Header/>
     
        <div className="mt-16 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{paper?.description}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">功課</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Margot Foster</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">課程</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.examination?.name}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">科目</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.curriculum?.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">題目數量</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.total_questions}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">所需時間</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.suggest_time}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">總分</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.max_score}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">所用時間</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{paper?.max_score}</dd>
              </div>

            </dl>
          </div>
        </div>
        </>
      )
}