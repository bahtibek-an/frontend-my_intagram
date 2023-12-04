import "./Post.css"
import ReactPlayer from 'react-player';
import { useState, useEffect, useMemo, useRef } from "react";
import sound_on from '../images/volum.png'
import sound_off from '../images/sound_off.png'


const Player = ({ url, key, muted, unmuted }) => {

    const ref = useRef(null)



    function useIsInViewport(ref) {
        const [isIntersecting, setIsIntersecting] = useState(false);

        const observer = useMemo(
            () =>
                new IntersectionObserver(([entry]) =>
                    setIsIntersecting(entry.isIntersecting),
                ),
            [],
        );

        useEffect(() => {
            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }, [ref, observer]);

        return isIntersecting;
    }

    const isInViewport = useIsInViewport(ref);


    return (
        <>
            <ReactPlayer
                url={url}
                key={key}
                width="468px"
                height="auto"
                loop={true}
                playing={isInViewport}
                muted={muted}
            />
            <div ref={ref} style={{ height: "200px"}}>

            </div>
            <img src={muted ? sound_off : sound_on} className='sound'
                onClick={unmuted}/>
        </>
    )
}

export default Player