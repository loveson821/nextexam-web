import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import axiosInstance from "../helper/axiosInstance";

export default function PaperCanCorrectList(paper_id: number, status = '') {
    const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
    const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite(
        (index) =>
            `me/paper_can_correct_list/${paper_id}.json?count=10&page=${index + 1}&status=${status}`,
        fetcher
    );

    return {
        size: size,
        setSize: setSize,
        error: error,
        data: data && data[0]?.others,
        i_correcting: data && data[0]?.i_correcting,
    };
}