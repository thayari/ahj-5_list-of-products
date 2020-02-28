import puppetteer from 'puppeteer';
const puppeteer = require('puppeteer');
const childProcess = require('child_process');

jest.setTimeout(30000); // default puppeteer timeout
describe('validation form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => { // открыть браузер
    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  }); // открыть браузер
  afterAll(async () => { // закрыть браузер
    await browser.close();
  }); // закрыть браузер



  describe('adding item', () => {
    test('should add item to the list', async () => {
      await page.goto(baseUrl);
      const addButton = await page.$('.add');
      addButton.click();
      const form = await page.$('#form-add');
      const addTitle = await form.$('#add-title');
      const addPrice = await form.$('#add-price');
      await addTitle.type('test title');
      await addPrice.type('123');
      const submit = await form.$('.submit');
      submit.click();
      await page.waitForSelector('.item');
    });
  });
});