const puppeteer = require("puppeteer");
require("dotenv").config();

const emailInputId = "#username";
const passwordInputId = "#password";
const submitButtonClass = ".btn__primary--large";

const interval = 5000;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const loginPage = await browser.newPage();
  await loginPage.goto(
    "https://www.linkedin.com/login/pt?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
  );

  await loginPage
    .waitForSelector(emailInputId)
    .then(() => loginPage.type(emailInputId, process.env.EMAIL));

  await loginPage
    .waitForSelector(passwordInputId)
    .then(() => loginPage.type(passwordInputId, process.env.PASSWORD));

  const dimensions = await loginPage.evaluate(() => {
    document.querySelector(".btn__primary--large").click();

    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  await loginPage.waitForTimeout(interval);

  const jobsPage = await browser.newPage();
  await jobsPage.goto(
    "https://www.linkedin.com/jobs/search/?currentJobId=3202701658&keywords=Desenvolvedor%20de%20front-end&refresh=true"
  );

  await loginPage.waitForTimeout(interval);
})();
