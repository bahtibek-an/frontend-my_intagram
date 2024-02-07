import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import UserProfile from '../components/profile';
import PageTemplate from '../templates/page-template';

export default function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username);
            if (user?.userId) {
                setUser(user);
            } else {
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, history]);

    return (
        <PageTemplate>
            {user?.username ? (
                <div className="bg-gray-background">
                    <UserProfile user={user} />
                </div>
            ) : null}
        </PageTemplate>
    );
}
