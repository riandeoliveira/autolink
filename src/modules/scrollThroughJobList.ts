import { Browser, Page } from "puppeteer";
import { page } from "../data";
import { Scroll } from "../interfaces";

const scrollThroughJobList = async (browser: Browser) => {
  const jobsPage: Page = await browser.newPage();
  await jobsPage.goto(page.jobs);

  await jobsPage.evaluate(() => {
    const jobsArea = <HTMLElement>(
      document.querySelector(".jobs-search-results-list")
    );

    const scroll: Scroll = {
      min: 0,
      current: 0,
      max: 80,
    };

    const interval: number = 50;

    const scrollInterval = setInterval(() => {
      if (scroll.current <= scroll.max) {
        jobsArea.scrollBy(scroll.min, scroll.current);

        scroll.current++;
      } else clearInterval(scrollInterval);
    }, interval);
  });
};

export default scrollThroughJobList;
