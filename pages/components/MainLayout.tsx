import Footer from "./footer";
import Header from "./header";

export default function MainLayout({ children }: any) {
    return (
      <div className=' min-h-screen h-full relative'>
        <Header />
        <main className='w-full h-full pb-40'>
            <div className='flex flex-col w-full pt-2 justify-center items-center'>
                {children}
            </div>
        </main>
        <Footer />
      </div>
    )
  }