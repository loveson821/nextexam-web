/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react';
import {
  CheckCircleIcon, ChevronDownIcon, CollectionIcon,
  EyeIcon,
  FlagIcon, PencilAltIcon
} from '@heroicons/react/solid';
import { Fragment } from 'react';
import { useServices } from '../services';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props:any) {
  const { t} = useServices();
  const switchStatus = (status: string) => {
      props.onSwitch(status)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {props.title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={()=>switchStatus('')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <CollectionIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  {t.do('exam_status.all')}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={()=>switchStatus('submited')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <FlagIcon className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" aria-hidden="true" />
                  {t.do('exam_status.un_correction')}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={()=>switchStatus('correcting')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <PencilAltIcon className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" aria-hidden="true" />
                  {t.do('exam_status.correcting')}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={()=>switchStatus('proofread')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <EyeIcon
                    className="mr-3 h-5 w-5 text-green-400 group-hover:text-green-500"
                    aria-hidden="true"
                  />
                  {t.do('exam_status.proofread')}
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                    onClick={()=>switchStatus('done')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <CheckCircleIcon className="flex-shrink-0 mr-3 h-5 w-5 text-green-400" aria-hidden="true" />
                  {t.do('exam_status.done_correction')}
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
