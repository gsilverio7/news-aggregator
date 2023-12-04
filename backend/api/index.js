const { getNews } = require('./src/getNews.js');

async function getNewsApi() {
    const response = await getNews();
    //console.log(response.statusCode);
    //console.log(response.body);
    return response;
}

exports.handler = getNewsApi;

//getNewsApi();