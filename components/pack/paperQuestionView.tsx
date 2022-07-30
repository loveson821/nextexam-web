import PaperAnswerView from "./paperAnswerView";
import PaperModelAnswerView from "./paperModelAnswerView";

export default function PaperQuestionView(props: any) {
    
    return (
        <>
            <div className="mt-4 border-b-2 border-b-[#4cc5cd]">
                <span className=" inline-block bg-[#4cc5cd] text-white text-lg text-center w-20 py-1 rounded-tl-md rounded-tr-md">题目{props.index}</span>
                <label>
                    <span className="inline-block ml-4 text-[#828282] text-sm">題型：</span><span className="text-[#828282] text-sm">单选题</span>
                </label>
                <label>
                <span className="inline-block ml-4 text-[#828282] text-sm">難度：</span><span className="text-[#828282] text-sm">{props.tiku?.difficulty || '簡單'}</span>
                </label>
            </div>
            <div className="p-2 bg-[#f8f8f8]">
                <span className="text-sm" dangerouslySetInnerHTML={{
                        __html: props.tiku?.content
                      }}></span>
            </div>
            <PaperAnswerView tiku={props.tiku} selectAnswer={props.selectAnswer}/>
            <div className="h-2 bg-[#949191]"></div>
            {/* <PaperModelAnswerView/> */}
        </>
    )
}