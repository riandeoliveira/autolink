// // const fetchJobsData = async (page) => {
// //   await page.evaluate(() => {
// //     const jobsList = [];

// //     const jobsArea = document.querySelector(".jobs-search-results-list");

// //     const scroll = {
// //       min: 0,
// //       current: 0,
// //       max: 80,
// //     };

// //     const interval = 50;

// //     const scrollInterval = setInterval(() => {
// //       if (scroll.current <= scroll.max) {
// //         jobsArea.scrollBy(scroll.min, scroll.current);

// //         scroll.current++;
// //       } else {
// //         clearInterval(scrollInterval);

// //         const jobsElements = Array.from(
// //           document.querySelectorAll(".artdeco-entity-lockup__content")
// //         );

// //         jobsElements.map((job) => {
// //           let title = job.children[0].children[0].textContent
// //             ?.replace(/\n/g, "")
// //             .trim();

// //           let companyName = job.children[1].children[0];

// //           let workplace = Array.from(job.children[2].children[0].children)
// //             .map((name) => name.textContent?.replace(/\n/g, "").trim())
// //             .join(" - ");

// //           if (companyName !== undefined) {
// //             let company = companyName.textContent?.replace(/\n/g, "").trim();

// //             const newJob = {
// //               title,
// //               company,
// //               workplace,
// //             };

// //             jobsList.push(newJob);
// //           }
// //         });
// //       }
// //     }, interval);

// //     console.log(jobsList);
// //   });
// // };

// // module.exports = fetchJobsData ;

// const fetchJobsData = async (page) => {
//   const jobsIdList = await page.$$eval(".job-card-container", (jobs) =>
//     jobs.map((jobs) => jobs.dataset.jobId)
//   );

//   let i = 0;

//   setInterval(async () => {
//     const url = `https://www.linkedin.com/jobs/search/?currentJobId=${jobsIdList[i]}&keywords=Desenvolvedor%20de%20front-end&refresh=true`;

//     await page.goto(url);

//     i++;
//   }, 5000);
// };

// module.exports = fetchJobsData;
