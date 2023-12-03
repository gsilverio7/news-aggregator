const { newsScrapper } = require('./src/newsScrapper.js');
const { storeNews } = require('./src/storeNews.js');

const scrapeAndStoreNews = async () => {
    try {
        const data = await newsScrapper();
        for (const websiteNews of data) {
            await storeNews(websiteNews);
            //console.log(websiteNews)
        }
        return { statusCode: 200, body: 'Success inserting items' };
    } catch (error) {
        console.error('Error: ', error);
        return { statusCode: 500, body: 'Error inserting items: ' + error };
    };
}

exports.handler = scrapeAndStoreNews;

//scrapeAndStoreNews();