import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

const Header: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        handleStart();
        handleComplete();

        return () => {
            handleComplete();
        };
    }, [location]);

    return (
        <header className="bg-white border-b border-gray-300 px-4 py-2 mx-4 flex items-center justify-between sticky top-0 z-50">
            <Link to={'/'}>
                <h1 className="text-lg font-bold text-blue-400">Podcaster</h1>
            </Link>
            {isLoading && <LoadingIndicator />}
        </header>
    );
};

export default Header;

