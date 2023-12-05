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

    const getNews = async () => {
        const data = await fetch('https://ljc5bhe8lc.execute-api.us-west-2.amazonaws.com/alpha')
            .then(response => {return response.json()});
        
        //console.log(data);

        if (data.statusCode === 200) {
            let g1News = data.body.filter(item => item.website.S === 'G1');
            //g1News = g1News.sort((a, b) => a.scrape_date.S - b.scrape_date.S);
            let cnnNews = data.body.filter(item => item.website.S === 'CNN');
            let igNews = data.body.filter(item => item.website.S === 'IG');

            setNews({g1: g1News, cnn: cnnNews, ig: igNews});

            //console.log(g1News[0].link.S);
            //console.log(cnnNews);
            //console.log(igNews);
        }




        //return data;
    }

    useEffect(() => {
        /*
        const databaseNews = {
            g1: [
                {
                    title: 'Titulo da Noticia',
                    url: 'http://google.com',
                    subject: 'politica',
                    data_busca: '16/10/2023'
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
        */

        getNews();
        //setNews(databaseNews);
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
