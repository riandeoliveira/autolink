const jobsArea = document.querySelector(".jobs-search-results-list");

let companyNames;
let jobNames;

const minScroll = 0;
const maxScroll = 80;

let currentScroll = 0;

const jobs = [];

const scrollInterval = setInterval(() => {
  if (currentScroll <= maxScroll) {
    jobsArea.scrollBy(minScroll, currentScroll);

    currentScroll++;
  } else {
    clearInterval(scrollInterval);

    const jobsList = Array.from(
      document.querySelectorAll(".artdeco-entity-lockup__content")
    ).map((job) => {
      let jobName = job.children[0].children[0].textContent
        .replace(/\n/g, "")
        .trim();

      let companyName = job.children[1].children[0];

      if (companyName !== undefined) {
        companyName = companyName.textContent.replace(/\n/g, "").trim();

        let modelName = Array.from(job.children[2].children[0].children)
          .map((name) => name.textContent.replace(/\n/g, "").trim())
          .join(" - ");

        const newJob = {
          title: jobName,
          company: companyName,
          model: modelName,
        };

        jobs.push(newJob);
      }
    });
  }
}, 50);
