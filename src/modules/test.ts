const jobsArea = document.querySelector(".jobs-search-results-list");
import { scroll } from "../data";

const jobs = [];

const scrollInterval = setInterval(() => {
  if (scroll.current <= scroll.max) {
    jobsArea?.scrollBy(scroll.min, scroll.current);

    scroll.current++;
  } else {
    clearInterval(scrollInterval);

    const jobsList = Array.from(
      document.querySelectorAll(".artdeco-entity-lockup__content")
    ).map((job) => {
      let jobName = job.children[0].children[0].textContent
        ?.replace(/\n/g, "")
        .trim();

      let companyName: any = job.children[1].children[0];

      if (companyName !== undefined) {
        companyName = companyName.textContent?.replace(/\n/g, "").trim();

        let workPlace = Array.from(job.children[2].children[0].children)
          .map((name) => name.textContent?.replace(/\n/g, "").trim())
          .join(" - ");

        const newJob = {
          title: jobName,
          company: companyName,
          work_place: workPlace,
        };

        jobs.push(newJob);
      }
    });
  }
}, 50);
