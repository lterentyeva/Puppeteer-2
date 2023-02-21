const dateNow = new Date();
const date = dateNow.getDate();
module.exports = {
  currentDate: async function (page, selector) {
    const days = await page.$$(selector);
    for (let i = 0; i < days.length; i++) {
      let getNumber = await page.$eval(days[i], (el) => el.value);
      if (Number(date) <= Number(getNumber)) {
        await days[i].click();
      }
      break;
    }
  },
};
