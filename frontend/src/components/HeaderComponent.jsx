import React from 'react';

export default function HeaderComponent() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <a
                className="flex items-center gap-2 font-semibold text-xl text-gray-800 dark:text-gray-200"
                href="#"
            >
                <svg
                    className=" w-8 h-8"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <path d="M18 14h-8" />
                    <path d="M15 18h-5" />
                    <path d="M10 6h8v4h-8V6Z" />
                </svg>
                News Aggregator
            </a>
            <nav className="flex gap-4">
                <a
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
                    href="#"
                >
                    Home
                </a>
                <a
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
                    href="#"
                >
                    Categories
                </a>
                <a
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
                    href="#"
                >
                    About
                </a>
            </nav>
        </header>
    );
}
