import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { User } from '../../models';
import { validate_email } from '../../utils/validate';
import MyModal from '../../components/MyModal';
import { useServices } from '../../services';
import AuthService from '../../services/auth_services';

const Sign_up: NextPage = () => {
  const router = useRouter();
  const { t } = useServices();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const [visable, setVisable] = useState(false)
  const [description, setDescription] = useState('')

  const submit = () => {
    if (data.name.length == 0) {
      showTip(t.do('sign_up.nickname_null'));
      return;
    }
    if (data.email.length == 0 || data.password.length == 0) {
      showTip(t.do('sign_up.email_password_null'));
      return;
    }
    if (validate_email(data.email) == false) {
      showTip(t.do('sign_up.email_error'));
      return;
    }
    if (data.password.length < 6) {
      showTip(t.do('sign_up.password_last_6'));
      return;
    }
    if (data.password !== data.confirm_password) {
      showTip(t.do('sign_up.two_diff_password'));
      return;
    }
    var _user = new User({
      password: data.password,
      name: data.name,
      email: data.email
    })
    AuthService.signUp(_user).then((data: any) => {
      router.push("/auth/sign_in")
    }).catch(res => {
      console.log(res);
      if (!res.success) {
        if (res.errors.email) {
          showTip(t.do('sign_up.email_same'))
        } else if (res.errors.phone) {
          showTip(t.do('sign_up.phone_same'))
        } else {
          console.log(res.data);
          showTip(res.data.error)
        }
      } else {
        showTip(res.toString())
      }
    })
  }
  function handleChange(e: any) {
    if (e.target.files) {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  const showTip = (description: string) => {
    setVisable(true)
    setDescription(description)
  }
  const cancelClick = () => {
    setVisable(false)
  }
  const confirmClick = () => {
    setVisable(false)
  }
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto w-auto  text-center">
            <Image
              src="https://examhero.com/website/logo-light.png"
              alt="Workflow"
              width={50}
              height={50}
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t.do('general.sign_up')}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6" >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.do('sign_up.nickname')}
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.do('sign_up.email')}
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t.do('sign_up.password')}
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t.do('sign_up.confirm_password')}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="confirm_password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Confirm Your Password"
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={submit}
                  className="w-full flex justify-center py-2 px-4 border  rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {t.do('general.confirm')}
                </button>
              </div>
              <div >
                <span className=' text-sm'>{t.do('sign_in.read_agree')}</span>
                <a href={'https://examhero.com/pages/terms'} target="_blank" rel="noreferrer" className=' text-sm text-blue-500'>{t.do('sign_in.terms')}</a>
                <span className=' text-sm'>{t.do('sign_in.and')}</span>
                <a href={'https://examhero.com/pages/privacy'} target="_blank" rel="noreferrer" className=' text-sm text-blue-500'>{t.do('sign_in.privacy')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description} />
    </>

  )
}
export default Sign_up;