import type { NextPage } from 'next'
import Link from 'next/link';
import { useState } from 'react';
import  {FaLock, FaUser}  from "react-icons/fa";
import axiosInstance from './helper/axiosInstance';

const Login: NextPage = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const login_submit = () => {
        // fetch(`http://www.examhero.com/api/users/sign_in.json`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //                 user: {
        //                 password: '123456',
        //                 email: '12345@qq.com'
        //                 }})
        //   }).then(async r => {
        //     if (r.status !== 200) throw await r.text();
        //     return r.json();
        //   }).then(tdata => {
        //     localStorage.setItem('token', `${tdata.token_type} ${tdata.access_token}`);

        //   });

        // axiosInstance
        //     .post('users/sign_in.json', {
        //         user: {
        //         password: '123456',
        //         email: '12345@qq.com'
        //         }
        //     }).then((res) => {
        //         alert(data.username)
        //         // console.log(res.data)
             
        //     }).catch((err) => {
        //         alert(data.username)
        //         // console.log(err.toString())
        //     })

    }
    function handleChange(e:any) {
        if (e.target.files) {
            setData({ ...data, [e.target.name]: e.target.files[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
      }
  return (
    <div className="bg-[#2c3338] w-full  h-screen text-center flex justify-center items-center">
        <div className=" w-60">
            <div>
                <label className="text-white text-5xl">登入3</label>
            </div>
            <div className="mt-8">
                <div className="flex-row w-full h-12  ">
                    <label  className=" inline-block  p-2 h-10 w-1/4  bg-[#363b41] rounded-l-md ">
                        <svg className='inline-block h-4 w-4 text-[#606468]'>
                            <FaUser></FaUser>
                        </svg>
                    </label>
                    <input name="username" onChange={handleChange} className="h-10 w-3/4  p-2  bg-[#3b4148] text-sm  text-white  border-none outline-none placeholder-gray-300::placeholder rounded-r-md" placeholder='郵箱/電話號碼'></input>
                </div>
                <div className="flex-row w-full h-12 text-center">
                    <label  className="inline-block  w-1/4 p-2 h-10  bg-[#363b41] rounded-l-md ">
                        <svg className='inline-block h-4 w-4 text-[#606468]'>
                            <FaLock></FaLock>
                        </svg>
                    </label>
                    <input name="password"  onChange={handleChange}  type={"password"} className="w-3/4 h-10  p-2  bg-[#3b4148] text-sm text-white  border-none outline-none placeholder-gray-300::placeholder rounded-r-md" placeholder='密碼'></input>
                </div>
                <div className="flex-row w-full h-12 text-center mt-4">
                    <button className="w-full h-10 bg-[#ea4c88] text-white rounded-md" onClick={login_submit}>登入</button>
                </div>
                <div className="flex-row w-full h-12 text-center">
                    <Link href={''}>
                        <a className=" text-white text-sm hover:underline">未註冊會員?立即註冊>></a>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Login;