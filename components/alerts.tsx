import { ExclamationIcon, XIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function Alerts(props: any) {
  const [show, setShow] = useState(true)
  const dismiss = () => {
    setShow(false)
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div  
      className={classNames(
        props.show && show ? 'visible' : 'invisible',
        'bg-yellow-50 p-4 fixed top-20 right-0'
      )}
>
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Lorem ipsum 
            </p>
          </div>
          
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
