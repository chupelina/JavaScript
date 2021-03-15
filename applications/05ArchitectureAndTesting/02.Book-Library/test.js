//@ts-check
const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

const host = 'http://localhost:5500';
const DEBUG = true;

let browser;
let context;
let page;

describe('E2E tests', function () {
    if (DEBUG) {
        this.timeout(12000);
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

    describe('library', () => {
        it('load all books', async () => {
            await page.goto(host);
            await page.click('text=load all books');
            page.waitForTimeout(500)
            const books = await page.$$eval('tbody>tr>td', r => r.map(td => td.textContent));
            let isOk = false;
            if (books.includes("Harry Potter and the Philosopher's Stone") &&
                books.includes("C# Fundamentals") &&
                books.includes("Svetlin Nakov") &&
                books.includes("J.K.Rowling")) {
                isOk = true;
            }
            assert.isTrue(isOk);
        });


        it('create new book', async () => {
            await page.goto(host);
           let title = '111';
           let author = '000'
            await page.fill('#createForm > input[type=text]:nth-child(3)', title);
            await page.fill('#createForm > input[type=text]:nth-child(5)', author);
            await page.click('text=Submit');
            await page.click('text=load all books');
            const books = await page.$$eval('tbody>tr>td', r => r.map(td => td.textContent));
            let isOk = false;
            if (books.includes(title) &&
                books.includes(author) ) {
                isOk = true;
            }
            assert.isTrue(isOk);
        });
        it('edit book', async () => {
            await page.goto(host);
            await page.click('text=load all books');
           let title = '222';
           await page.click('body > table > tbody > tr:nth-child(3) > td:nth-child(3) > button.editBtn')
       await page.fill('#editForm > input[type=text]:nth-child(4)', title)
            await page.click('text=Save');
            
            await page.click('text=load all books');
            let isOk = false;
            const books = await page.$$eval('tbody>tr>td', r => r.map(td => td.textContent));
            if (books.includes("222") &&
                books.includes("000") ) {
                isOk = true;
            }
            assert.isTrue(isOk);
        });
// работя когато си пожелая и нямам идея защо :)
        it('delete book', async () => {
            await page.goto(host);
            await page.click('text=load all books');
            await page.click('body > table > tbody > tr:nth-child(3) > td:nth-child(3) > button.deleteBtn');
            await page.on('dialog', dialog => dialog.accept());
            await page.click('text=load all books');
            const books = await page.$$eval('tbody>tr>td', r => r.map(td => td.textContent));
            let isOk = false;
            if (!books.includes("222") && !books.includes("000") ) {
                isOk = true;
            }
            assert.isTrue(isOk);
        });

    })
})

