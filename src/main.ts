import puppeteer, { Browser } from "puppeteer";
import { authenticateUser, scrollThroughJobList, searchJobsData } from "./modules";

(async () => {
  const browser: Browser = await puppeteer.launch({ headless: false });

  await authenticateUser(browser);
  await scrollThroughJobList(browser);
  await searchJobsData();
})();
