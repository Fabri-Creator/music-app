import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-white border-b border-gray-300 px-4 py-2 mx-4 flex items-center justify-between sticky top-0 z-50">
            <Link to={'/'}>
                <h1 className="text-lg font-bold text-blue-400">Podcaster</h1>
            </Link>
        </header>
    );
};

export default Header;

