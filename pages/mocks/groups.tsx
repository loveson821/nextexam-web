import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import useSWR from "swr";
import Group from "../../models/Group";
import Bar from "../../components/bar";
import Loading from "../../components/Loading";
import MocksService from "../../services/mocks_services";

const pages = [
  { name: '模擬試', href: '/mocks/groups', current: true },
  { name: '選擇模擬試', href: '#', current: true }
]

const Index: NextPage = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const { data, error } = useSWR('me/groups', () => MocksService.groups())

  React.useEffect(() => {
      var docs: any = data
      setGroups(docs)
    }, [data]);

  // React.useEffect(() => {
  //     console.log("data",data);
  //     console.log("error",error);
  //   }, [data, error]);
  // if( !groups ){
  //   return <Loading/>
  // }
  
  return (
    <>
      <div className=" max-w-screen-lg w-full" >
        <Loading visable={!groups} />
        <Bar pages={pages} />
        <ul role="list" className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {groups?.map((group: Group) => (
            <li
              key={group.id}
              className="col-span-1 flex flex-col cursor-pointer text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <Link href={'/mocks/courses?group_id=' + group.id + "&group_name=" + group.name}>
                <div className="flex-1 flex flex-col p-8">
                  <Image className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={group.avatar || ''} alt="" width={250} height={250} layout="responsive"/>
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">{group.name}</h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
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
export default Index