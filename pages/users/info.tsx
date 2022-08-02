import {
    getDownloadURL, ref,
    uploadBytesResumable
} from "firebase/storage"
import React, { useEffect, useState } from 'react'
import 'react-medium-image-zoom/dist/styles.css'
import storage from '../../firebase.js'
import { User } from '../../models'
import useCallbackState from '../../utils/useCallbackState'
import { Util } from '../../utils/util'
import MyDropdown from '../../components/MyDropdown'
import MyInfoInputModal from '../../components/MyInfoInputModal'
import MyZoomImage from '../../components/MyZoomImage'
import { useServices } from '../../services'
import AuthService from '../../services/auth_services'
import Loading from "../../components/Loading";
import useSWR from "swr";
import Link from "next/link.js"

export default function Info() {
    const { t } = useServices();
    const [user, setUser] = React.useState<User>()
    const [userData, setUserData] = useCallbackState({
        ...user,
    })
    const [visable, setVisable] = useState(false)
    const [type, setType] = useState('')
    const [value, setValue] = useState('')
    const [token, setToken] = useState('')

    let careers = [t.do('me.student'), t.do('me.teacher'), t.do('me.persons'), t.do('me.other')];
    let regions = [t.do('me.mo'), t.do('me.hk'), t.do('me.other')];
    let grades = [t.do('me.grade_15'), t.do('me.grade_14'), t.do('me.grade_13'), t.do('me.grade_12'), t.do('me.grade_11'), t.do('me.grade_10'),
    t.do('me.grade_6'), t.do('me.grade_5'), t.do('me.grade_4'), t.do('me.grade_3'), t.do('me.grade_2'), t.do('me.grade_1')];

    React.useEffect(() => {
        var _user = localStorage.getItem('user')
        if (_user != null && _user !== '') {
            var user = new User(JSON.parse(_user))
            setUser(user)
            setUserData(user)
        }
        if (localStorage.getItem('token') != null && localStorage.getItem('token') !== '') {
            var toekn: any = localStorage.getItem('token')
            setToken(toekn)
        }
        // loadData()
    }, []);

    const { data, error } = useSWR([`me.json`, token], () => AuthService.getInfo())

    useEffect(() => {
        // loadData();
        if (data) {
            // setUserData(data.doc)
            // localStorage.setItem('user', JSON.stringify(data.doc))
        }
    }, [data]);

    // const loadData = () => {
    //     AuthService.getInfo().then((data: any) => {
    //         setUserData(data.doc)
    //         localStorage.setItem('user', JSON.stringify(data.doc))
    //     })
    // }

    const handleSubmit = async (user: User) => {
        // console.log(userData);
        await AuthService.save(user)
        localStorage.setItem('user', JSON.stringify(user))
    }
    const switchCareer = (value: string) => {
        setUserData({
            ...user,
            career: value
        }, function (user: User) {
            handleSubmit(user)
        })

    }
    const switchRegion = (value: string) => {
        setUserData({
            ...user,
            school_region: value
        }, function (user: User) {
            handleSubmit(user)
        })

    }
    const switchGrade = (value: string) => {
        setUserData({
            ...user,
            grade: value
        }, function (user: User) {
            handleSubmit(user)
        })
    }


    const cancelClick = () => {
        setVisable(false)
    }
    const handleConfirm = (type: string, value: string) => {
        setVisable(false)
        switch (type) {
            case 'nickname':
                setUserData({
                    ...user,
                    name: value
                }, function (user: User) {
                    handleSubmit(user)
                })
                break;
            case 'school':
                setUserData({
                    ...user,
                    school: value
                }, function (user: User) {
                    handleSubmit(user)
                })
                break;
            default:
                break;
        }

    }

    const handleFileSelect = (e: any) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                // console.log(reader.result);
                await handleImage(file);
                e.target.value = null;//上传完图片后要清空file，下次可以继续上传
            };
            reader.onerror = () => {
                console.log(reader.error);
            };
        }
    };

    const handleImage = async (file: any) => {
        if (!file) return;
        //   setLoading(true)
        const storageRef = ref(storage, `avatar/` + Util.get_url_extension(file.name))
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                // setPercent(percent);
                // console.log(percent);

            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((uploadUrl) => {
                    // console.log("uploadUrl", uploadUrl);
                    setUserData({
                        ...user,
                        avatar: uploadUrl
                    }, function (user: User) {
                        handleSubmit(user)
                    })
                    // setLoading(false)

                });
            }
        );

    }

    return (
        <>
            <div className=" w-9/12 mx-auto md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                    <div className="px-4 sm:px-6 md:px-0 flex justify-between">
                        <h1 className="text-3xl font-extrabold text-gray-900">{t.do('me.info.title')}</h1>
                        {
                            userData?.has_school_section == true ?
                                <Link href={'https://www.examhero.com/appkit/teacher_dashboard?access_token=' + token}>
                                    <a
                                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        {t.do('me.manage.center')}
                                    </a>
                                </Link>
                                : ''
                        }

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
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.nick')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">{userData?.name}</span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
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
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.avatar')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">
                                                    <MyZoomImage url={userData?.avatar} className={'h-8 w-8 rounded-full'} width={50} height={50} />
                                                </span>
                                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                    <label
                                                        className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Update</span>
                                                        <input name="file-upload" multiple type="file" className="sr-only" onChange={handleFileSelect} />
                                                    </label>
                                                </span>
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.email')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">{userData?.email}</span>
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.career')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">{userData?.career}</span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <MyDropdown value={userData?.career} datas={careers} onSwitch={switchCareer} />
                                                </span>
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.grade')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">{userData?.grade}</span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <MyDropdown value={userData?.grade} datas={grades} onSwitch={switchGrade} />
                                                </span>
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.school_region')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">{userData?.school_region}</span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <MyDropdown value={userData?.school_region} datas={regions} onSwitch={switchRegion} />
                                                </span>
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
                                            <dt className="text-sm font-medium text-gray-500">{t.do('me.info.school')}</dt>
                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                <span className="flex-grow">{userData?.school}</span>
                                                <span className="ml-4 flex-shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => {

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
            <MyInfoInputModal visable={visable} cancelClick={cancelClick} confirmClick={handleConfirm} value={value} type={type} />
        </>

    )
}
