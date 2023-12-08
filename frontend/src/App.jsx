/**
 * v0 by Vercel.
 * @see https://v0.dev/t/b5XdWdY4YB6
 */

import { useEffect, useState } from 'react';
import G1Logo from './assets/g1.png';
import CnnLogo from './assets/cnnbrasil.png';
import IgLogo from './assets/ig.png';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import NewsSection from './components/NewsSection';

function App() {
    const [news, setNews] = useState({});
    const [allNews, setAllNews] = useState({});

    const getNews = async () => {
        let data;

        const cachedAPIResponse = localStorage.getItem('News');
        const cachedAPIResponseDate = new Date(localStorage.getItem('NewsDate'));

        if (cachedAPIResponse && (cachedAPIResponseDate.getTime() < new Date().getTime())) {
            console.log('cache');
            data = JSON.parse(cachedAPIResponse);
        } else {
            console.log('api');
            data = await fetch(
                'https://yl0slgfdti.execute-api.us-west-2.amazonaws.com/production'
            ).then((response) => {
                return response.json();
            });

            if (data.statusCode === 200) {
                localStorage.setItem('News', JSON.stringify(data));
                localStorage.setItem('NewsDate', new Date().toString());
            } else {
                return;
            }
        }

        let g1News = data.body.filter((item) => item.website.S === 'G1');
        let cnnNews = data.body.filter((item) => item.website.S === 'CNN');
        let igNews = data.body.filter((item) => item.website.S === 'IG');

        const updatedNews = { g1: g1News, cnn: cnnNews, ig: igNews };
        setAllNews(updatedNews);
        setNews(updatedNews);
    };

    const filterBySubject = (subject) => {
        let g1News = allNews.g1.filter((item) => item.subject.S === subject);
        let cnnNews = allNews.cnn.filter((item) => item.subject.S === subject);
        let igNews = allNews.ig.filter((item) => item.subject.S === subject);

        setNews({ g1: g1News, cnn: cnnNews, ig: igNews });
    };

    const showAllNews = () => {
        setNews(allNews);
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
            <HeaderComponent
                filterFunction={filterBySubject}
                showAll={showAllNews}
            />
            <main className="flex flex-col sm:flex-row flex-grow overflow-auto bg-white dark:bg-gray-900">
                <NewsSection logoSrc={G1Logo} news={news.g1 || []} />
                <NewsSection
                    logoSrc={CnnLogo}
                    news={news.cnn || []}
                    middle={true}
                />
                <NewsSection logoSrc={IgLogo} news={news.ig || []} />
            </main>
            <FooterComponent />
        </div>
    );
}

export default App;
