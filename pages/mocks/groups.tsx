import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import Group from "../../models/Group";
import Bar from "../components/bar";
import Footer from "../components/footer";
import Header from "../components/header";
import MocksService from "../services/mocks_services";

const pages = [
  { name: '模擬試', href: '/groups', current: true },
  { name: '選擇模擬試', href: '#', current: true }
]

  const index: NextPage = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    
    React.useEffect(() => {
        loadData();
      }, []);
      const loadData = () => {
        MocksService.groups().then((docs: any) => {
            console.log("docs: ", docs);

            if( docs )
              setGroups(docs)
            
        }).catch((error) => {
            console.error(error);
        })
    }
    return (
      <>
      <div className=" max-w-screen-lg w-full">
      <Bar pages={pages}/>
        <ul role="list" className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {groups.map((group: Group) => (
                <li
                key={group.id}
                className="col-span-1 flex flex-col cursor-pointer text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                <Link href={'/mocks/courses?group_id='+group.id+"&group_name="+group.name}>
                <div className="flex-1 flex flex-col p-8">
                    <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={group.avatar} alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{group.name}</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                    {/* <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-sm">{group.name1}</dd>
                    <dt className="sr-only">Role</dt> */}
                    <dd className="mt-3">
                        <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {group.name1 || ' -- '}
                        </span>
                    </dd>
                    </dl>
                </div>
                </Link>
                </li>
            ))}
            </ul>
      </div>
      </>
    )
  }
  export default index