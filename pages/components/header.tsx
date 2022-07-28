import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { User } from '../../models';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useServices } from '../services';



export default function Header() {
  const { t } = useServices();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<User>()
  const router = useRouter();
  const [token, setToken] = useState('')
  const [data, setData] = useState({
    isHome: false,
    isMock: false,
    isEbook: false,
  })

  React.useEffect(() => {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') !== '') {
      setLoggedIn(true);
      var toekn: any = localStorage.getItem('token')
      setToken(toekn)
    }
    var _user = localStorage.getItem('user')
    if (_user != null && _user !== '') {
      var user = new User(JSON.parse(_user))
      setUser(user)
    }
    if (router.pathname.indexOf('mocks') != -1) {
      setData({
        isHome: false,
        isMock: true,
        isEbook: false,
      })
    } else if (router.pathname.indexOf('ebooks') != -1) {
      setData({
        isHome: false,
        isMock: false,
        isEbook: true,
      })
    } else {
      setData({
        isHome: true,
        isMock: false,
        isEbook: false,
      })
    }
  }, []);

  const logout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('user', '')
    setLoggedIn(false);
    router.push('/auth/sign_in')
  }
  const navigation = [
    { name: '首頁', href: '/', current: data.isHome },
    { name: '模擬試', href: '/mocks/groups', current: data.isMock },
    { name: '電子書', href: '/ebooks/groups', current: data.isEbook },
  ]
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 sticky  w-full top-0">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto rounded-lg"
                      src="https://examhero.com/website/logo-light.png"
                      alt="考試英雄"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto rounded-lg"
                      src="https://examhero.com/website/logo-light.png"
                      alt="考試英雄"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link
                    href={
                      loggedIn ?
                        'https://www.examhero.com/appkit/messages?access_token=' + token
                        : '/auth/sign_in'}
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </Link>

                  {
                    loggedIn ?

                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full border"
                              src={user?.avatar}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/users/info"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  {t.do('me.info.title')}
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/users/modify_password"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  {t.do('me.manage.modify_password.title')}
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={{}}
                                  // onClick={logout}
                                  className={classNames(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                >
                                  {t.do('general.logout')}
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      :
                      <div>
                        <Link
                          href={'/auth/sign_in'}
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                          )}
                        >
                          {t.do('general.sign_in')}
                        </Link>
                        <Link
                          href={'/auth/sign_up'}
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                          )}
                        >
                          {t.do('general.sign_up')}
                        </Link>
                      </div>

                  }
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* <header className='bg-slate-500 sticky top-0 w-full z-50'>
        <div className='container mx-auto p-6 flex flex-row justify-between'>
        <h1 className='text-4xl font-bold text-white'>
          <Link href='/'>
            <a>
              考試英雄
            </a>
          </Link>
          </h1>
        <div className='flex flex-row gap-4 items-center'>
          {
            loggedIn ? 
            <>
              <Link href='/mocks'>
                <a className='text-white hover:underline'>模擬試</a>
              </Link>
              <div className='group inline-block hover:text-red-500'>
                <div className='flex flex-row text-center pb-1 justify-center items-center cursor-pointer'>
                  <img src={user?.avatar} className="w-8 h-8 rounded-full"></img>
                  <a className='text-white'>{user?.name}</a>
                </div>
                <div className='p-2 mt-0 absolute flex-col bg-white text-sm border-[1px] border-ray-100  invisible group-hover:visible rounded-sm min-w-[100px]'>

                  <Link href='/me'><a className='block mt-1 text-black hover:text-blue-500 text-center'>個人資料</a></Link>
                  <a  className='block mt-1 cursor-pointer text-black hover:text-blue-500 text-center' onClick={logout}>登出</a>
                </div>
              </div>
            </>
            :
            <>
              <Link href='/login'>
                <a className='text-white hover:underline'>Login</a>
              </Link>
              <Link href='/sign_up'>
                <a className='text-white hover:underline'>Signup</a>
              </Link>
            </>
          }
        </div>
        </div>
      </header> */}
    </>
  )
}