import { RadioGroup } from "@headlessui/react"
import React from "react"
import { useState } from "react"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function PaperAnswerView(props: any) {
    const [correct_answer, set_correct_answer] = useState('')
    const [mcValue, setMcValue] = useState(props.tiku.answer)
    const [disabled, setDisabled] = useState(false)
    const mcOptions = ["A","B","C","D","E"]

    React.useEffect(() => {
        if( props.tiku?.answer ){
            set_correct_answer(props.tiku?.correct_answer)
        }
        
    },[])
    

    const select = async (value: any) => {
        setMcValue(value)
        setDisabled(true)
        set_correct_answer(props.tiku?.correct_answer)
        props.selectAnswer(props.tiku?.id, value)
        
      }

    
    return (
        <>
            <div className="mt-4 border-b-2 border-b-[#ffad2d]">
                <span className=" inline-block bg-[#ffad2d] text-white text-sm  text-center w-20 py-1 rounded-tl-md rounded-tr-md">答案</span>
            </div>
            <div className="p-4">
                <RadioGroup value={mcValue} onChange={select} className="mt-2">
                <div className="grid grid-cols-5 gap-1 sm:grid-cols-5">
                    {mcOptions.map((answer) => (
                    <RadioGroup.Option
                        key={answer}
                        value={answer}
                        disabled={disabled || props.tiku.answer}
                        className={({ active, checked }) =>
                        classNames(
                            checked && correct_answer != answer
                            ? ' bg-red-500 border-transparent text-white '
                            : 'bg-white border-gray-200 text-gray-900 ',
                            correct_answer == answer ? 'bg-[#1ab41a] border-transparent text-white' : '',
                            'cursor-pointer focus:outline-none border rounded-full w-14 h-14 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                        )}
                    >
                        <RadioGroup.Label as="p">{answer}</RadioGroup.Label>
                    </RadioGroup.Option>
                    ))}
                </div>
                </RadioGroup>
            </div>
        </>
    )
}