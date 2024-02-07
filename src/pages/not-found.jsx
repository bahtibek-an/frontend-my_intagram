import { useEffect } from 'react';
import PageTemplate from '../templates/page-template';

export default function NotFound() {
    useEffect(() => {
        document.title = 'Not Found - Instagram';
    }, []);

    return (
        <PageTemplate>
            <div className="not-found">
                <h1 className="not-found__header">Sorry, this page isn't available.</h1>
                <p className="not-found__text">The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
            </div>
        </PageTemplate>
    );
}
