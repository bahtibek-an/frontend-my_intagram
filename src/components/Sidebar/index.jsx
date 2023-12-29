import React from "react";
import useUser from "../../hooks/useUser";

const Suggestions = React.lazy(() => import("./Suggestions"));

const Sidebar = () => {
    const { user: { docId, userId, following } } = useUser();

    return (
        <>
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
        </>
    );
};

export default Sidebar;