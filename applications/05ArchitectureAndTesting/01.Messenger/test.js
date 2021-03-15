//@ts-check
const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

const host = 'http://localhost:5500';
const DEBUG = false;

let browser;
let context;
let page;

describe('E2E tests', function () {
    if (DEBUG) {
        this.timeout(120000);
    } else {
        this.timeout(6000);
    }

    before(async () => {
        if (DEBUG) {
            browser = await chromium.launch({ headless: false, slowMo: 500 });
        } else {
            browser = await chromium.launch();
        }
    });

    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('message', () => {
        it('get all messages', async () => {
            await page.goto(host);
            await page.click('text=Refresh');

            const messages = await page.$$eval('#messages', m => m.map(m => m.value));
            let neededToBe = 'Spami: Hello, are you there?\n' +
                'Garry: Yep, whats up :?\n' +
                'Spami: How are you? Long time no see? :)\n' +
                'George: Hello, guys! :))\n' +
                'Spami: Hello, George nice to see you! :)))';
            assert.equal(messages[0], neededToBe);
        });
        it('send new message', async () => {
            await page.goto(host);
            let name = 'aaa';
            let message = 'bbb';

            await page.fill('#author', name);
            await page.fill('#content', message);
            await page.click('#submit');
            await page.click('text=Refresh')
            const messages = await page.$$eval('#messages', m => m.map(m => m.value));
            let neededToBe = 'Spami: Hello, are you there?\n' +
                'Garry: Yep, whats up :?\n' +
                'Spami: How are you? Long time no see? :)\n' +
                'George: Hello, guys! :))\n' +
                'Spami: Hello, George nice to see you! :)))\n' +
                'aaa: bbb';
            assert.equal(messages[0], neededToBe);
        })

    })
})

