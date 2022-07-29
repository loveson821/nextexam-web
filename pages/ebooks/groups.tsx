import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import Group from "../../models/Group";
import Bar from "../../components/bar";
import { useServices } from "../../services";
import EbookService from "../../services/ebook_services";
import useSWR from "swr";
import Loading from "../../components/Loading";
import MyModal from "../../components/MyModal";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  // console.log(context);
  return {
    props: {
    }, // will be passed to the page component as props
  }
}

const Index: NextPage = () => {
  const { t } = useServices();
  const [groups, setGroups] = useState<Group[]>([]);
  const [visable, setVisable] = useState(false)
  const [description, setDescription] = useState('')
  const pages = [
    { name: '電子書', href: '#', current: true }
  ]

  const { data, error } = useSWR(`me/groups_v2.json`, () => EbookService.groups_v2())
  React.useEffect(() => {
    if (data && data != undefined) {
      var docs: any = data;
      let arr: any = []
      docs?.map((doc: any) => {
        doc?.groups?.map((group: any) => {
          arr.push(group)
        })

      })
      setGroups(arr)
    }
  }, [data]);

  
  //   const loadData = () => {
  //     EbookService.groups_v2().then((docs: any) => {
  //         console.log("docs: ", docs);
  //         let arr: any = []
  //         if( docs ){
  //           docs.map((doc: any)  => {
  //             doc?.groups?.map((group: any)  => {
  //               arr.push(group)
  //             })

  //           })

  //         }
  //           setGroups(arr)

  //     }).catch((error) => {
  //         console.error(error);
  //     })
  // }

  const subscriptionView = (group: Group) => {
    group = new Group(group)
    return (
      <div onClick={() => subscriptionClick(group)}>
        <div className=" cursor-pointer -mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              {/* <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
              <span className="ml-3">
                {group.is_free ? t.do('ebook.free') : group.hasVpass() ? t.do('ebook.subscription_finish') : t.do('ebook.subscription')}
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  function subscriptionClick(group: Group) {
    if (!group.is_free && !group.hasVpass()) {
      setVisable(true)
      setDescription("請下載【考試英雄】App進行訂閱~")
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
      <div className=" max-w-screen-lg w-full">
        <Loading visable={!data} />
        <Bar pages={pages} />
        <ul role="list" className="my-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {groups.map((group: Group) => (
            <li
              key={group.id}
              className="col-span-1 flex flex-col cursor-pointer text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <Link href={'/ebooks?group_id=' + group.id + "&group_name=" + group.name}>
                <div className="flex-1 flex flex-col p-8">
                  <Image className="w-30 h-30 flex-shrink-0 mx-auto rounded-full"   src={group.avatar || ''} alt="" width={250} height={250} layout="responsive"/>
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">{group.name}</h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    {/* <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-sm">{group.name1}</dd>
                    <dt className="sr-only">Role</dt> */}
                    <dd className="mt-3">
                      <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {group.name2 || ' -- '}
                      </span>
                    </dd>
                  </dl>
                </div>
              </Link>
              {subscriptionView(group)}
            </li>
          ))}
        </ul>
      </div>
      <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description} />
    </>
  )
}
export default Index