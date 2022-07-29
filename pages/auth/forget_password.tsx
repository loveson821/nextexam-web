import Image from 'next/image';
import { useState } from 'react';
import { validate_email } from '../../utils/validate';
import MyModal from '../../components/MyModal';
import { useServices } from '../../services';
import AuthService from '../../services/auth_services';

export default function ForgetPassword  () {
  const { t} = useServices();

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [visable, setVisable] = useState(false)
  const [description, setDescription] = useState('')


  const sendEmailSubmit = () => {

    setLoading(true);

    if (email == '') {
      showTip(t.do('forget_password.email_null'))
      setLoading(false)
      return
    }
    if (validate_email(email) == false) {
      showTip(t.do('sign_up.email_error'));
      return;
    }

    AuthService.forget_password(email).then(() => {
      showTip(t.do('forget_password.check_email'))
    }).catch((error) => {
      showTip(error);
      setLoading(false)
    })

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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{t.do('forget_password.send_email')}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
          </p>
        </div>
    
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6" >

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.do('sign_up.email')}
                </label>
                <div className="mt-1">
                  <input
                    name="email" 
                    type="email"
                    autoComplete="email"
                    placeholder={t.do('forget_password.input_email')}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
    
    
              <div>
                <button
                  type="submit"
                  onClick={sendEmailSubmit}
                  className="w-full flex justify-center py-2 px-4 border  rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-white"
                >
                  {t.do('general.confirm')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MyModal visable={visable} cancelClick={cancelClick} confirmClick={confirmClick} description={description}/>
   </>
  );
};
