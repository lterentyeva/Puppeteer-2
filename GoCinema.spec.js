const {
  clickElement,
  getText,
  putText,
  clickSeveralElements,
  expectedTicketInfo,
} = require("/Test/Puppeteer-2/lib/commands.js");
//const { currentDate } = require("./Puppeteer-2/lib/date.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.deleteCookie();
  page.close();
});

describe("Verify booking of the tickets", () => {
  test("Booking one ticket", async () => {
    const movieTimeButton = await page.$$("[class='page-nav__day-week']");
    await movieTimeButton[2].click();
    await clickElement(page, "[data-seance-id='142']");
    const freeSlots = await page.$$(
      "[class='buying-scheme__chair buying-scheme__chair_standart']"
    );
    await freeSlots[0].click();
    await clickElement(page, "[class='acceptin-button']");
    await clickElement(page, "[class='acceptin-button']");
    const expectedQRCode = await page.$eval("img", (n) =>
      n.getAttribute("src")
    );
    expect(expectedQRCode).toEqual("i/QR_code.png");
  });

  test("Booking several tickets", async () => {
    const movieTimeButton = await page.$$("[class='page-nav__day-week']");
    await movieTimeButton[2].click();
    await clickElement(page, "[data-seance-id='142']");
    await clickSeveralElements(
      page,
      "[class='buying-scheme__chair buying-scheme__chair_standart']"
    );
    await clickElement(page, "[class='acceptin-button']");
    await clickElement(page, "[class='acceptin-button']");
    const expected = await page.$eval("img", (n) => n.getAttribute("src"));
    expect(expected).toEqual("i/QR_code.png");
    await expectedTicketInfo(page, "Train arrival", "21:00");
  });

  test.only("'Booking' button should be disabled", async () => {
    const movieTimeButton = await page.$$("[class='page-nav__day-week']");
    await movieTimeButton[2].click();
    await clickElement(page, "[data-seance-id='142']");
    const expected = await page.$eval("button", (n) =>
      n.getAttribute("disabled")
    );
    expect(expected).toEqual("true");
  });
});
