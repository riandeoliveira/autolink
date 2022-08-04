const puppeteer = require("puppeteer");
const { page } = require("./data");
const authenticateUser = require("./modules/authenticateUser");
const fetchJobsData = require("./modules/fetchJobsData");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  const authPage = await browser.newPage();
  await authPage.goto(page.auth);
  await authenticateUser(authPage);
  await authPage.waitForTimeout(5000);

  const jobsPage = await browser.newPage();
  await jobsPage.goto(page.jobs);
  await fetchJobsData(jobsPage);
})();
