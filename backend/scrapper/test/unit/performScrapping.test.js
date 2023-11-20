const { performScraping } = require('../../src/newsScrapper.js');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const websiteFixture = fs.readFileSync(
    'test/fixtures/ig-politica.html',
    'utf8'
);
const expectedTestResponse = require('../fixtures/ig-poltica-response.json');
const { JSDOM } = require('jsdom');

describe('performScraping', () => {
    it('should scrape data from a website', async () => {
        const website = {
            name: 'IG',
            url: 'https://ultimosegundo.ig.com.br/',
            newsDiv: '.destaque-item',
            newsLink: '.destaque-item-link',
            newsTitle: '.destaque-item-link-ContentText-titulo',
        };

        // Mock Puppeteer functions
        const mockBrowser = {
            newPage: jest.fn().mockResolvedValue({
                setUserAgent: jest.fn(),
                goto: jest.fn(),
                waitForSelector: jest.fn(),
                evaluate: jest
                    .fn()
                    .mockImplementation((pageFunction) =>
                        pageFunction(website, 'politica')
                    ),
                close: jest.fn(),
            }),
            close: jest.fn(),
        };

        jest.spyOn(puppeteer, 'launch').mockResolvedValue(mockBrowser);

        // Mock the HTML content the page would provide
        const htmlContent = websiteFixture;

        // Create a new JSDOM environment for each test
        const { window } = new JSDOM(htmlContent);
        global.document = window.document;

        const result = await performScraping(website, 'politica');

        // Remove the scrape_date field from the result for comparison
        const resultWithoutDate = result.map(
            ({ scrape_date, ...rest }) => rest
        );

        // Assert the result based on our fixture
        expect(resultWithoutDate).toEqual(expectedTestResponse);

        // Ensure that our mocked browser is closed
        await expect(mockBrowser.close).toHaveBeenCalledTimes(1);
    });
});
