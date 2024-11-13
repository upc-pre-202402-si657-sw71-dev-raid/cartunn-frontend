import path from 'path';
import { useState } from 'react';

function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white dark:bg-yellow-500"
            aria-label={darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        >
            {darkMode ? (
                // Ícono de sol
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.636 17.364l-1.414 1.414M17.364 17.364l1.414 1.414M6.636 6.636l-1.414-1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
            ) : (
                // Ícono de luna
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a9 9 0 010 18 9 9 0 010-18z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-1.414 1.414M6.636 17.364l-1.414 1.414M17.364 17.364l1.414 1.414M6.636 6.636l-1.414-1.414" />
                </svg>
            )}
        </button>
    );
}

export default DarkModeToggle;