import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import { useServices } from '../services';

export default function detail() {
    const router = useRouter();
    const {t} = useServices();
    const [id, setId] = React.useState(router.query.id);
    
    return (
        <div className=' min-h-screen h-full relative'>
            <Header/>
            <div className='w-full pb-40'>
                {id}=
            </div>
            <Footer/>
        </div>
    )
}