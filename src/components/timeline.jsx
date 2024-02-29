/* eslint-disable no-nested-ternary */
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
    const { user } = useContext(LoggedInUserContext);
    const { photos } = usePhotos(user);

    return (
        <div className="dashboard__timeline inline-block">
            {!photos ? <Skeleton count={4} style={{ height: '600px', margin: '1rem', marginTop: '2.5rem' }} /> : photos.map((content) => <Post key={content.docId} content={content} />)}
        </div>
    );
}
