/**
 * v0 by Vercel.
 * @see https://v0.dev/t/b5XdWdY4YB6
 */

import React, { useEffect, useState } from 'react';
import G1Logo from './assets/g1.png';
import CnnLogo from './assets/cnnbrasil.png';
import IgLogo from './assets/ig.png';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NewsSection from './components/NewsSection';

function App() {

    const [news, setNews] = useState({});

    useEffect(() => {
        const databaseNews = {
            // id, title, url, website, subject, data_busca
            g1: [
                {
                    title: 'Titulo da Noticia',
                    url: 'http://google.com',
                    subject: 'politica',
                    data_busca: '16/10/2023'
                },
                {
                    title: 'Noticia lorem ipsum',
                    url: 'http://google.com',
                    subject: 'brasil',
                    data_busca: '06/10/2023'
                }
            ],
            cnn: [
                {
                    title: 'Titulo da Noticia',
                    url: 'http://google.com',
                    subject: 'politica',
                    data_busca: '16/10/2023'
                }
            ],
            ig: [
                {
                    title: 'Titulo da Noticia',
                    url: 'http://google.com',
                    subject: 'politica',
                    data_busca: '16/10/2023'
                }
            ]
        };

        setNews(databaseNews);
    }, []);

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
            <HeaderComponent />
            <main className="flex flex-col sm:flex-row flex-grow overflow-auto bg-white dark:bg-gray-900">
                <NewsSection logoSrc={ G1Logo } news={ news.g1 || [] } />
                <NewsSection logoSrc={ CnnLogo } news={ news.cnn || [] } middle={ true } />
                <NewsSection logoSrc={ IgLogo } news={ news.ig || [] } />
            </main>
            <FooterComponent />
        </div>
    );
}

export default App;
