import { Switch } from '@headlessui/react'
import React from 'react'
import { useState } from 'react'
import { User } from '../../models'
import Header from '../components/header'

export default function info() {
    const [user, setUser] = React.useState<User>()
    React.useEffect(() => {
    var _user = localStorage.getItem('user')
        if ( _user != null && _user !== '') {
        var user = new User(JSON.parse(_user))
        setUser(user)
        }
    },[]);
  return (
    <>  
        <Header/>
        <main className="flex-1">
            <div className=" w-9/12 mx-auto md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
                <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-extrabold text-gray-900">個人資料</h1>
                </div>
                <div className="px-4 sm:px-6 md:px-0">
                <div className="py-2">

                    {/* Description list with inline editing */}
                    <div className="mt-2 divide-y divide-gray-200">
                    {/* <div className="space-y-1">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">用戶資料</h3>
                    </div> */}
                    <div className="mt-6">
                        <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">暱稱</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{user?.name}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">頭像</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                                <img
                                className="h-8 w-8 rounded-full"
                                src={user?.avatar}
                                alt=""
                                />
                            </span>
                            <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                            <dt className="text-sm font-medium text-gray-500">郵箱</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{user?.email}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">學歷程度</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{user?.career}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">所在地區</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{user?.school_region}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">學校</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{user?.school}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                Update
                                </button>
                            </span>
                            </dd>
                        </div>
                        </dl>
                    </div>
                    </div>

                </div>
                </div>
            </div>
            </div>
        </main>
    </>
  )
}
