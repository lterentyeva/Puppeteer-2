const {
  Given,
  When,
  Then,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  clickElement,
  clickSeveralElements,
} = require("/Test/Puppeteer-2//lib/commands.js");

var browser;
var page;

BeforeAll(async function () {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });

  page = await browser.newPage();
});

AfterAll(async function () {
  page = await browser.close();
});

Given("user is on {string} page", async function (url) {
  await page.goto(url);
});

When(
  "user clicks day of week {int}",
  {
    timeout: 2 * 5000,
  },
  async function (day) {
    const movieTimeButton = await page.$$("[class='page-nav__day-week']");
    await movieTimeButton[day].click();
  }
);

When(
  "user clicks on the movie with id {string}",
  {
    timeout: 2 * 5000,
  },
  async function (time) {
    await clickElement(page, `[data-seance-id="${time}"]`);
  }
);

When(
  "user clicks on a free slots {int}",
  {
    timeout: 2 * 5000,
  },
  async function (slot) {
    const freeSlots = await page.$$(
      "[class='buying-scheme__chair buying-scheme__chair_standart']:not(buying-scheme__chair_taken)"
    );
    for (let i = 1; i <= slot; i++) {
      let index = i - 1;
      await freeSlots[index].click();
    }
  }
);

When(
  "user clicks acception button",
  {
    timeout: 2 * 5000,
  },
  async function (slot) {
    await clickElement(page, "[class='acceptin-button']");
  }
);

Then(
  "user gets QR code",
  {
    timeout: 2 * 5000,
  },
  async function (type) {
    const expectedQRCode = await page.$eval("img", (n) =>
      n.getAttribute("src")
    );
    expect(expectedQRCode).to.equal("i/QR_code.png");
  }
);

Then(
  "user gets disabled button",
  {
    timeout: 2 * 5000,
  },
  async function (type) {
    const expected = await page.$eval("button", (n) =>
      n.getAttribute("disabled")
    );
    expect(expected).to.equal("true");
  }
);
