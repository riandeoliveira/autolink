// const puppeteer = require("puppeteer");
// const { page } = require("./data");
// const authenticateUser = require("./modules/authenticateUser");
// const scrollThroughJobsList = require("./modules/scrollThroughJobsList");
// const fetchJobsData = require("./modules/fetchJobsData");

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     args: ["--start-maximized"],
//     defaultViewport: null,
//   });

//   const authPage = await browser.newPage();
//   await authPage.goto(page.auth);
//   await authenticateUser(authPage);
//   await authPage.waitForTimeout(15000);

//   const jobsPage = await browser.newPage();
//   await jobsPage.goto(page.jobs);
//   await scrollThroughJobsList(jobsPage);
//   await fetchJobsData(jobsPage);
// })();

const puppeteer = require("puppeteer");
const puppeteerExtra = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

const pages = {
  auth: "https://www.linkedin.com/login/pt?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin",
};

(async () => {
  await puppeteerExtra.use(stealthPlugin());

  const browser = await puppeteerExtra.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  const authPage = await browser.newPage();
  await authPage.goto(pages.auth);
})();
