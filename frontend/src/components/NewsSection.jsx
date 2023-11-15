import React from 'react';

export default function NewsSection({logoSrc, news, middle = false}) {
    return (
        <div className={"w-full sm:w-1/3 p-4 bg-white dark:bg-gray-900" + (middle ? " sm:border-l sm:border-r sm:border-gray-200 sm:dark:border-gray-700" : "")}>
            <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                <img src={logoSrc} className="h-16 mb-5" alt="iG" />
            </h2>
            {news.map((article) => {
                return (
                    <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="mb-2">
                            <a
                                className="text-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
                                href={article.url}
                            >
                                {article.title}
                            </a>
                            <div className="text-gray-500 dark:text-gray-400">
                                {"buscada em: " + article.data_busca}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}
