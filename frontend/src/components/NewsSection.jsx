import React from 'react';

export default function NewsSection({logoSrc, news, middle = false}) {
    console.log(news);
    return (
        <div className={"w-full sm:w-1/3 p-4 bg-white dark:bg-gray-900" + (middle ? " sm:border-l sm:border-r sm:border-gray-200 sm:dark:border-gray-700" : "")}>
            <h2 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">
                <img src={logoSrc} className="h-16 mb-5" alt="iG" />
            </h2>
            {news.map((article) => {
                return (
                    <div key={article.link.S} className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="mb-2">
                            <a
                                className="text-2xl font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400"
                                href={article.link.S}
                            >
                                {article.title.S}
                            </a>
                            <div className="text-gray-500 dark:text-gray-400">
                                {"buscada em: " + dateFormat(article.scrape_date.S)}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

function dateFormat (date) {
    const data = new Date(date);

    const dia = adicionarZero(data.getDate());
    const mes = adicionarZero(data.getMonth() + 1);
    const ano = data.getFullYear();
    const hora = adicionarZero(data.getHours());
    const minuto = adicionarZero(data.getMinutes());
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;    
}

function adicionarZero(number) {
    let string = number.toString();
    if (string.length == 1) {
        return '0' + string;
    }
    return string;
}