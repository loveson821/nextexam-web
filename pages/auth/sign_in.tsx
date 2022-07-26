import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useServices } from '../services';
import AuthService from '../services/auth_services';
import GoogleBtn from '../components/GoogleBtn'

const sign_in: NextPage = () => {
    const router = useRouter();
    const { t } = useServices();
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const login_submit = () => {
        AuthService.signIn(data.username, data.password).then((data:any) => {
            localStorage.setItem('token', `${data.doc.authentication_token}`);
            localStorage.setItem('user', JSON.stringify(data.doc));
            // router.push("/")
            window.location.href = "/"
        }).catch(res => alert(res.toString()))
    }
    function handleChange(e:any) {
        if (e.target.files) {
            setData({ ...data, [e.target.name]: e.target.files[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
      }
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="mx-auto h-12 w-auto"
        src="https://examhero.com/website/logo-light.png"
        alt="Workflow"
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
              <a href="/auth/forget_password" className="font-medium text-indigo-600 hover:text-indigo-500">
              {t.do('sign_in.forget_password')}
              </a>
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
            <a
              href='/auth/sign_up'
              className="w-full cursor-pointer flex justify-center py-2 px-4 border  rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-white"
            >
              {t.do('general.sign_up')}
            </a>
          </div>
          <div >
            <span className=' text-sm'>{t.do('sign_in.read_agree')}</span>
            <a  href={'https://examhero.com/pages/terms'} target="_blank" className=' text-sm text-blue-500'>{t.do('sign_in.terms')}</a>
            <span className=' text-sm'>{t.do('sign_in.and')}</span>
            <a href={'https://examhero.com/pages/privacy'} target="_blank" className=' text-sm text-blue-500'>{t.do('sign_in.privacy')}</a>
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
              {/* <GoogleBtn/> */}
              {/* <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              > */}
                {/* <span className="sr-only">Sign In With Google</span> */}
                {/* <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg> */}
              {/* </a> */}
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>

  )
}
export default sign_in;