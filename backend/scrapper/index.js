const { newsScrapper } = require('./src/newsScrapper.js');
const { storeNews } = require('./src/storeNews.js');

const scrapeAndStoreNews = async () => {
    try {
        const data = await newsScrapper();
        data.forEach(websiteNews => {
            storeNews(websiteNews);
        });
    } catch (error) {
        console.error('Error: ', error);
    };
}

exports.handler = async () => {
    await scrapeAndStoreNews();
}