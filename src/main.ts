import puppeteer, { Browser, Page } from "puppeteer";
import { page } from "./data";
import { authenticateUser, fetchJobsData } from "./modules";

(async () => {
  const browser: Browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  const authPage: Page = await browser.newPage();
  await authPage.goto(page.auth);
  await authenticateUser(authPage);

  const jobsPage: Page = await browser.newPage();
  await jobsPage.goto(page.jobs);
  await fetchJobsData(jobsPage);
})();
