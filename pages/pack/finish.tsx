import { CheckCircleIcon } from "@heroicons/react/outline";

export default function Finish() {
    return (
        <div className="w-full items-center flex justify-center">
            <div className="max-w-screen-lg w-full bg-white overflow-hidden text-center mt-10">
                <div className="flex justify-center">
                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"/>
                    <label>完成評估!</label>
                </div>
            </div>
        </div>
    )
}