import { Page } from "puppeteer";
import { Scroll } from "../interfaces";

const fetchJobsData = async (page: Page) => {
  return await page.evaluate(() => {
    const jobsList: any = [];

    const jobsArea = <HTMLElement>(
      document.querySelector(".jobs-search-results-list")
    );

    const scroll: Scroll = {
      min: 0,
      current: 0,
      max: 80,
    };

    const interval: number = 50;

    const scrollInterval: NodeJS.Timer = setInterval(() => {
      if (scroll.current <= scroll.max) {
        jobsArea.scrollBy(scroll.min, scroll.current);

        scroll.current++;
      } else {
        clearInterval(scrollInterval);

        const jobsElements: Element[] = Array.from(
          document.querySelectorAll(".artdeco-entity-lockup__content")
        );

        jobsElements.map((job) => {
          let title = job.children[0].children[0].textContent
            ?.replace(/\n/g, "")
            .trim();

          let companyName = job.children[1].children[0];

          let workplace = Array.from(job.children[2].children[0].children)
            .map((name) => name.textContent?.replace(/\n/g, "").trim())
            .join(" - ");

          if (companyName !== undefined) {
            let company = companyName.textContent?.replace(/\n/g, "").trim();

            const newJob = {
              title,
              company,
              workplace,
            };

            jobsList.push(newJob);
          }
        });
      }
    }, interval);

    console.log(jobsList);
  });
};

export default fetchJobsData;