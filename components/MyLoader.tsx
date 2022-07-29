import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";

export default function MyLoader(props: any) {
    return (
        <BarLoader loading={props.loading} color={'purple'}  width={'100%'} />
    )

}