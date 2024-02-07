import { useState, useEffect } from 'react';
import { firebase } from '../../lib/firebase';
import 'firebase/storage';
import Skeleton from 'react-loading-skeleton';

export default function Photo({ photo }) {
    const [imgUrl, setImageUrl] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const image = storageRef.child(photo.imageSrc);
        image.getDownloadURL().then((url) => setImageUrl(url));
    }, [photo.imageSrc]);

    return <>
    {<img src={imgUrl} alt={photo.caption} className="photos__img" style={{display: loaded ? 'inline-block' : 'none'}} onLoad={() => setLoaded(true)}/>}
    {!(imgUrl && loaded) && <Skeleton width={400} height={400}/>}</>;
}
