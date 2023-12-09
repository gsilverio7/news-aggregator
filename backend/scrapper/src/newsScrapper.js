//require('dotenv').config();
const puppeteer = require('puppeteer-core');
const chromium = require("@sparticuz/chromium");

const subjects = ['economia', 'politica'];

const websites = [
    {
        name: 'G1',
        url: 'https://g1.globo.com/',
        newsDiv: '.feed-post-body',
        newsLink: '.feed-post-link',
        newsTitle: '.feed-post-link',
    },
    {
        name: 'CNN',
        url: 'https://www.cnnbrasil.com.br/',
        newsDiv: '.home__list__item',
        newsLink: '.home__list__tag',
        newsTitle: '.market__new__title',
    },
    {
        name: 'IG',
        url: 'https://ultimosegundo.ig.com.br/',
        newsDiv: '.destaque-item',
        newsLink: '.destaque-item-link',
        newsTitle: '.destaque-item-link-ContentText-titulo',
    },
];

async function performScraping(website, subject) {
    const browser = await puppeteer.launch({ 
        args: process.env.IS_LOCAL ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.IS_LOCAL
          ? process.env.CHROMIUM_PATH
          : await chromium.executablePath(),
        headless: process.env.IS_LOCAL ? false : chromium.headless,
    });
    const page = await browser.newPage();

    // Set a user agent to mimic a browser
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'
    );

    // Navigate to the target web page
    await page.goto(website.url + subject + '/', { timeout: 60000 });

    // Wait for the content to load. You might need to adjust the selector and timeout.
    await page.waitForSelector(website.newsDiv, { timeout: 6000 });

    // Extract the data you need
    const scrapedData = await page.evaluate((website) => {
        const data = [];
        document.querySelectorAll(website.newsDiv).forEach((el) => {
            const now = new Date();
            data.push({
                link: el.querySelector(website.newsLink).getAttribute('href'),
                title: el.querySelector(website.newsTitle).textContent,
                scrape_date: now.toISOString(),
                expire_date: Math.floor(now.getTime() / 1000) + (7 * 24 * 60 * 60)
            });
        });
        return data;
    }, website);

    // Close the browser
    await browser.close();

    return scrapedData;
}

async function newsScrapper() {
    const websitesCount = websites.length;
    const subjectsCount = subjects.length;
    const response = [];
    let i = 1;
    for (const subject of subjects) {
        let j = 1;
        console.log(
            `Buscando notícias sobre o assunto ${subject}. Assunto ${i} de um total de: ${subjectsCount}.`
        );
        for (const website of websites) {
            console.log(
                `buscando noticias do website ${website.name}. Website ${j} de um total de ${websitesCount}.`
            );
            let news = await performScraping(website, subject);

            response.push({
                website: website.name,
                subject: subject,
                data: news,
            });
            j++;
        }
        i++;
    }

    return response;
}

module.exports = {
    performScraping,
    newsScrapper,
};
