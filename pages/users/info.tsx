import { Switch } from '@headlessui/react'
import React from 'react'
import { useState } from 'react'
import { User } from '../../models'
import Header from '../components/header'
import { useServices } from '../services'
import MyDropdown from '../components/MyDropdown'
import useCallbackState from '../../utils/useCallbackState';
import AuthService from '../services/auth_services'
import MyInfoInputModal from '../components/MyInfoInputModal'

export default function info() {
    const { t} = useServices();
    const [user, setUser] = React.useState<User>()
    const [userData, setUserData] = useCallbackState({
        ...user,
      })
    let careers = [t.do('me.student'), t.do('me.teacher'), t.do('me.persons'), t.do('me.other')];
    let regions = [t.do('me.mo'), t.do('me.hk'), t.do('me.other')];
    let grades = [t.do('me.grade_15'), t.do('me.grade_14'), t.do('me.grade_13'), t.do('me.grade_12'), t.do('me.grade_11'), t.do('me.grade_10'),
    t.do('me.grade_6'), t.do('me.grade_5'), t.do('me.grade_4'), t.do('me.grade_3'), t.do('me.grade_2'), t.do('me.grade_1')];

    React.useEffect(() => {
    var _user = localStorage.getItem('user')
        if ( _user != null && _user !== '') {
            var user = new User(JSON.parse(_user))
            setUser(user)
            setUserData(user)
        }
    },[]);

    const handleSubmit = async (user: User) => {
        // console.log(userData);
        await AuthService.save(user)
        localStorage.setItem('user', JSON.stringify(user))
    }
    const switchCareer = (value: string) => {
        setUserData({
            ...user,
            career: value
          }, function (user: User)  {
            handleSubmit(user)
          })
        
    }
    const switchRegion = (value: string) => {
        setUserData({
            ...user,
            school_region: value
        }, function (user: User)  {
            handleSubmit(user)
        })
        
    }
    const switchGrade = (value: string) => {
        setUserData({
            ...user,
            grade: value
        }, function (user: User)  {
            handleSubmit(user)
        })
    }

    const [visable, setVisable] = useState(false)
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const cancelClick = () => {
      setVisable(false)
    }
    const handleScoreConfirm = (type: string,value: string) => {
        console.log('type',type);
        console.log("value", value);
        
        
      setVisable(false)
      switch (type) {
        case 'nickname':
            setUserData({
                ...user,
                name: value
            }, function (user: User)  {
                handleSubmit(user)
            })
            break;
        case 'school':
            setUserData({
                ...user,
                school: value
            }, function (user: User)  {
                handleSubmit(user)
            })
            break;
        default:
            break;
      }
     
  }

  return (
    <>  
        <Header/>
        <main className="flex-1">
            <div className=" w-9/12 mx-auto md:px-8 xl:px-0">
            <div className="pt-10 pb-16">
                <div className="px-4 sm:px-6 md:px-0">
                <h1  className="text-3xl font-extrabold text-gray-900">個人資料</h1>
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
                            <span className="flex-grow">{userData?.name}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                type="button"
                                onClick={()=>{
                                    setValue(userData?.name)
                                    setType('nickname')
                                   
                                    setVisable(true)
                                }}
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
                                src={userData?.avatar}
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
                            <span className="flex-grow">{userData?.email}</span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.career')}</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userData?.career}</span>
                            <span className="ml-4 flex-shrink-0">
                                <MyDropdown value={userData?.career} datas={careers} onSwitch={switchCareer}/>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.grade')}</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userData?.grade}</span>
                            <span className="ml-4 flex-shrink-0">
                                <MyDropdown value={userData?.grade} datas={grades} onSwitch={switchGrade}/>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">所在地區</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userData?.school_region}</span>
                            <span className="ml-4 flex-shrink-0">
                                <MyDropdown value={userData?.school_region} datas={regions} onSwitch={switchRegion}/>
                            </span>
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                            <dt className="text-sm font-medium text-gray-500">學校</dt>
                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">{userData?.school}</span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={()=>{
                                       
                                        setType('school')
                                        setValue(userData?.school)
                                        setVisable(true)
                                    }}
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
            <MyInfoInputModal visable={visable} cancelClick={cancelClick} confirmClick={handleScoreConfirm} value={value} type={type}/>
        </main>
    </>
  )
}
