import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useServices } from '../services';
import AuthService from '../services/auth_services';
import GoogleBtn from '../components/GoogleBtn'
import Link from 'next/link';
import Image from 'next/image';

const Sign_in: NextPage = () => {
  const router = useRouter();
  const { t } = useServices();
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const login_submit = () => {
    AuthService.signIn(data.username, data.password).then((data: any) => {
      localStorage.setItem('token', `${data.doc.authentication_token}`);
      localStorage.setItem('user', JSON.stringify(data.doc));
      // router.push("/")
      window.location.href = "/"
    }).catch(res => alert(res.toString()))
  }
  function handleChange(e: any) {
    if (e.target.files) {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="https://examhero.com/website/logo-light.png"
          alt="Workflow"
          width={100}
          height={100}
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t.do('general.sign_in')}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.do('sign_in.email_or_phone')}
              </label>
              <div className="mt-1">
                <input
                  name="username"
                  type="text"
                  autoComplete="email"
                  placeholder="Your Email / Phone"
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.do('sign_in.password')}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your Password"
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">

              <div className="text-sm">
                <Link href={{}} className="font-medium text-indigo-600 hover:text-indigo-500">
                  {t.do('sign_in.forget_password')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={login_submit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t.do('general.sign_in')}
              </button>
            </div>
            <div>
              <Link
                href='/auth/sign_up'
                className="w-full cursor-pointer flex justify-center py-2 px-4 border  rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-white"
              >
                {t.do('general.sign_up')}
              </Link>
            </div>
            <div >
              <span className=' text-sm'>{t.do('sign_in.read_agree')}</span>
              <Link href={'https://examhero.com/pages/terms'} target="_blank" rel="noreferrer" className=' text-sm text-blue-500'>{t.do('sign_in.terms')}</Link>
              <span className=' text-sm'>{t.do('sign_in.and')}</span>
              <Link href={'https://examhero.com/pages/privacy'} target="_blank" rel="noreferrer" className=' text-sm text-blue-500'>{t.do('sign_in.privacy')}</Link>
            </div>
          </div>

          <div className="mt-6 invisible">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t.do('sign_in.login_methods')}</span>
              </div>
            </div>

            <div className="mt-6  gap-3">
              <div className='flex w-full justify-center'>

              </div>


            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Sign_in;