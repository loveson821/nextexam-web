
import router from 'next/router';
import React, { useState } from 'react';
import MyModal from '../../components/MyModal';
import { useServices } from '../../services';
import AuthService from '../../services/auth_services';


export default function ModifyPassword() {
  const { t } = useServices();
  const [loading, setLoading] = useState(false)
  const [visable, setVisable] = useState(false)
  const [description, setDescription] = useState('')
  const [needLogout, setNeedLogout] = useState(false)

  React.useEffect(() => {

  }, []);

  const [data, setData] = React.useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
    isValidPassword: true,
    isValidOldPassword: true,
    isValidComfirmPassword: true
  });

  // function oldPasswordInputChange(val: string) {
  //   if (val.trim().length >= 6) {
  //     setData({
  //       ...data,
  //       oldPassword: val,
  //       isValidOldPassword: true
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       oldPassword: val,
  //       isValidOldPassword: false,
  //     });
  //   }
  // }

  function passwordInputChange(val: string) {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  }

  function confirmInputChange(val: any) {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        confirmPassword: val,
        isValidComfirmPassword: true
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        isValidComfirmPassword: false,
      });
    }
  }

  const handleSubmit = async () => {
    
    if (data.password !== data.confirmPassword) {
      setVisable(true)
      setDescription(t.do('me.manage.modify_password.password_not_same'))
      return;
    } else if (data.password.length == 0 || data.confirmPassword.length == 0 ) {

      setVisable(true)
      setDescription(t.do('me.manage.modify_password.password_not_null'))
      return;
    }
    // setLoading(true);
    AuthService.modify_password(data.password).then((res) => {
      setNeedLogout(true)
      setVisable(true)
      setDescription(t.do('me.manage.modify_password.password_save_success'))
    }).catch((err) => {
      setVisable(true)
      setDescription(err.toString())
    }).finally(() => {
    });

  }

  const logout = () => {
    setNeedLogout(false)
    localStorage.setItem('token','')
    localStorage.setItem('user','')
    router.push('/users/sign_in')
  }
  
  const cancelClick = () => {
    setVisable(false)
  }
  const confirmClick = () => {
      setVisable(false)
      if( needLogout ){
        logout()
      }
  }

  return (

    <>  
        <div className=" w-9/12 mx-auto md:px-8 xl:px-0">

          <div className="flex flex-col w-full pt-2 justify-center items-center">
          <div className=" max-w-screen-lg w-full">
            <div className=" mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <h5 className="text-3xl font-medium leading-6 text-gray-900">修改密碼</h5>
                    <div className="grid grid-cols-6 gap-6 mt-6">
                      <div className="col-span-4 sm:col-span-4">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          {t.do('me.manage.modify_password.new_password')}
                        </label>
                        <input
                          type="password"
                          onChange={(e)=> passwordInputChange(e.target.value)}
                          placeholder={t.do('me.manage.modify_password.new_password')}
                          className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          {t.do('me.manage.modify_password.confirm_password')}
                        </label>
                        <input
                          type="password"
                          onChange={(e) => {confirmInputChange(e.target.value)}}
                          placeholder={t.do('me.manage.modify_password.confirm_password')}
                          className="mt-1 p-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      onClick={handleSubmit}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t.do('general.save')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description} />
    </>
  );
};