const { newsScrapper } = require('./src/newsScrapper.js');
const { storeNews } = require('./src/storeNews.js');

//comment line 5 and 15 to test locally
exports.handler = async () => {
    newsScrapper()
        .then((data) => {
            data.forEach(websiteNews => {
                storeNews(websiteNews);
            });
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}