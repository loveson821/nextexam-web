import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

/* This example requires Tailwind CSS v2.0+ */
const _404: NextPage = () => {
  return (
    <div></div>
    // 下邊呢段有個 build error, 所以改成這樣

    
      // <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
      //   <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      //     <div className="flex-shrink-0 flex justify-center">
      //       <Link href="/" className="inline-flex">
      //         <span className="sr-only">考試英雄</span>
      //         <Image width={100} height={100}
      //           className="h-12 w-auto"
      //           src="https://examhero.com/website/logo-light.png"
      //           alt=""
      //         />
      //       </Link>
      //     </div>
      //     <div className="py-16">
      //       <div className="text-center">
      //         <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
      //         <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
      //         <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      //         <div className="mt-6">
      //           <Link href="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
      //             Go back home<span aria-hidden="true"> &rarr;</span>
      //           </Link>
      //         </div>
      //       </div>
      //     </div>
      //   </main>
      //   <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      //     <nav className="flex justify-center space-x-4">
      //       <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
      //         Contact Support
      //       </Link>
      //       <span className="inline-block border-l border-gray-300" aria-hidden="true" />
      //       <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
      //         Status
      //       </Link>
      //       <span className="inline-block border-l border-gray-300" aria-hidden="true" />
      //       <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
      //         Twitter
      //       </Link>
      //     </nav>
      //   </footer>
      // </div>
  )
}
export default _404