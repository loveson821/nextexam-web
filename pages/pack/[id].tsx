import { useRouter } from "next/router";
import useSWR from "swr";
import PaperQuestionView from "../../components/pack/paperQuestionView";
import Tiku from "../../models/Tiku";
import { useServices } from "../../services";

export async function getServerSideProps() {
    return { props: {} }
  }
  
  export default function Detail() {
    const router = useRouter();
    const { t } = useServices();
    const pack = router.query.id
    const token = router.query.access_token
    const { data: tikus, error } = useSWR('me/groups',() => loadData())


    const loadData = async () => {
        const res = await fetch(`https://www.examhero.com/api/user_tikus?pack=${pack}`,{ 
            headers: { Authorization: "Bearer " + token} 
        } )
        const data = await res.json()
        console.log(data);
        
        if( data && data.doc){
            return data.doc.user_tikus
        }else{
            return data.doc.error
        }
       
    }

    const selectAnswer = async (tiku_id: number, answer: string) => {
        console.log("tiku_id", tiku_id);
        console.log("answer", answer);

        const res = await fetch(`https://www.examhero.com/api/user_tikus/${tiku_id}`,{ 
            method: 'put',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token}, 
            body: JSON.stringify({
                "answer": answer
            }),
        } )

        const data = await res.json()
        console.log(data);
        
        if( data && data.doc){

        }
        
    }

    const submit = async () => {
        const res = await fetch(`https://www.examhero.com/api/milas/finish`,{ 
            method: 'post',
            headers: { 'Content-Type': 'application/json', Authorization: "Bearer " + token}, 
            body: JSON.stringify({
                "pack": pack
            }),
        } )

        const data = await res.json()
        console.log(data);
        
        if( data && data.success){
            router.push('/pack/finish')
        }
    }


    return (
        <div className="w-full items-center flex justify-center">
            <div className="max-w-screen-lg w-full bg-white shadow overflow-hidden ">
                <div className="py-4">
                    {tikus?.map((tiku: Tiku, index: number) => {
                        return <PaperQuestionView key={index} index={index+1} tiku={tiku} selectAnswer={selectAnswer}/>
                    })}
                    {
                        tikus?.length > 0 &&
                        <div className="max-w-screen-lg flex sm:rounded-md mt-4 justify-center">
                            <button
                                type="button"
                                onClick={submit}
                                className="inline-flex w-1/4 text-center  justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                {t.do('general.submit')}
                            </button>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
  }