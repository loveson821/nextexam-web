export default function MyVideo(props: any) {
    return (
        <video loop  style={{ width: '100%', height: 'auto' }} preload="auto" controls={true} playsInline={true} 
            controlsList="nodownload nofullscreen">
            <source src={props.src} />
        </video>
    )

}