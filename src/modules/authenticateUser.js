const { input } = require("../data");
const { EMAIL, PASSWORD } = require("../libs/dotenv");

const authenticateUser = async (page) => {
  await page
    .waitForSelector(input.email)
    .then(() => page.type(input.email, EMAIL));

  await page
    .waitForSelector(input.password)
    .then(() => page.type(input.password, PASSWORD));

  await page.evaluate(() => {
    const submitButton = document.querySelector(".btn__primary--large");

    submitButton.click();
  });

  await page.waitForTimeout(5000);
};

module.exports = authenticateUser;
