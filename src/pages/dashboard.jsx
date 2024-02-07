import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';
import PageTemplate from '../templates/page-template';

export default function Dashboard({ user: loggedInUser }) {
    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <PageTemplate>
            <div className="dashboard">
                <div className="dashboard__container">
                    <Timeline/>
                    <Sidebar/>
                </div>
            </div>
        </PageTemplate>
    );
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};
