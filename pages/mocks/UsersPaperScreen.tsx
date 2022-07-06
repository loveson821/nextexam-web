import React from 'react';
import Paper from '../../models/Paper';
import UsersPaper from '../../models/UsersPaper';
import Footer from '../components/footer'
import Header from '../components/header'
import { useServices } from '../services';
import PaperService from '../services/paper_service';
import UsersPaperService from '../services/users_paper_service';

export default function UsersPaperScreen() {
    const { t} = useServices();
    const [users_paper, setUsersPaper] = React.useState<UsersPaper>();
    const [paper, setPaper] = React.useState<Paper>();
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        loadData()
      }, []);
    
    const loadData = async () => {
        var paper_id = 1853;
        var user_paper_id = 12983;
        const res = await PaperService.load(paper_id);
        const paper = new Paper(res);
        setPaper(paper)
        if (user_paper_id) {
          const r = await UsersPaperService.load(user_paper_id);
          const up = new UsersPaper(r);
          setUsersPaper(up);
        }
        console.log("paper:", paper);
        console.log("users_paper:", users_paper);
        
    }
    const items = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        // More items...
      ]
    return (
        <>
            <Header/>
            <div className='mt-16 w-full'>
                <div className='flex flex-col w-full pt-2 justify-center items-center'>
                    <div className="w-9/12 flex sm:rounded-md">
                        <ul role="list" className="w-3/4 space-y-6">
                            {paper?.paper_pages.map((item:any) => (
                                <li key={item.id} className="bg-white shadow overflow-hidden   sm:rounded-md">
                                    
                                    <img src={item.content}/>

                                    <div className="mt-8 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                            >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            </svg>
                                            <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                        </div>
                                </li>
                            ))}
                        </ul>
                        <div className='w-1/4 ml-16'>
                            <div className=" fixed w-1/6  bg-white shadow px-4 py-5 sm:px-6  flex-row justify-between">
                                222<br/> 222<br/> 222<br/> 222<br/> 222<br/> 222<br/> 222<br/> 222<br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}