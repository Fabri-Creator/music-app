import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="fixed top-0 right-0 mx-4 my-2">
            <div className="w-8 h-8 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
        </div>
    );
};

export default LoadingIndicator;
