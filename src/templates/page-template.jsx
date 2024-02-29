import Header from '../components/header';

export default function PageTemplate({children}) {
    return (
        <div className="page">
            <Header />
            <div className="page__container">
                {children}
            </div>
        </div>
    )
}