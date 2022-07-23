import { useServices } from "../services";

export default function LoadMore(props: any) {
    const {t} = useServices();
    return (
        <div className="max-w-screen-lg w-full mt-6">
            <button
                disabled={props.disabled}
                onClick={props.loadMoreData}
                className="w-full flex cursor-pointer justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    {
                        props.isLoadingMore
                            ? t.do('general.load_data')
                        : props.isReachingEnd
                            ? t.do('general.nodata')
                        : '加載更多數據'
                    }
            </button>
        </div>
    )
}