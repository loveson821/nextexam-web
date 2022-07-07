import React, { useState } from 'react';

export default function QuestionActionButton(props: any) {
    return (
        <div className='flex flex-row justify-end '>
            <a className=' cursor-pointer   p-2' onClick={props.onPress}>
                <span className=' text-[#333]'>{props.title}</span>
            </a>
        </div>
      )
}