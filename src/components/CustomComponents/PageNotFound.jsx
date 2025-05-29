import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
                <h1 className="text-5xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8">Oops! The page you are looking for does not exist.</p>
                <Link to="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-md hover:bg-primary-strong">
                    Go to Home
                </Link>
            </div>
        </>
    );
};

export default PageNotFound;
