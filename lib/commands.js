module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },

  clickSeveralElements: async function (page, selector) {
    try {
      const severalSelectors = await page.$$(selector);
      await severalSelectors[0].click();
      await severalSelectors[1].click();
      await severalSelectors[2].click();
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  expectedTicketInfo: async function (page, movie, sessionStart) {
    const selectorMovie = await page.$eval(
      ".ticket__title",
      (link) => link.textContent
    );
    const selectorTime = await page.$eval(
      ".ticket__start",
      (link) => link.textContent
    );

    expect(selectorMovie).toEqual(movie);
    expect(selectorTime).toEqual(sessionStart);
  },
};
