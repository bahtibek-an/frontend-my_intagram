import { useState } from "react"
import ReactPlayer from "react-player"


const Main = ({url, urlType}) => {

    const [muted, setMuted] = useState(true)

    return (
        <div onClick={()=>{muted ? setMuted(false) : setMuted(true)}}
        style={{background: "rgba(0,0,0,0.1"}}>
            {urlType === "image/jpeg" ?
            <img src={url} height="700px"/> :
            <ReactPlayer
                url = {url}
                width="auto"
                height="700px"
                playing
                loop
                muted={muted}
            />}
        </div>
    )
}

export default Main