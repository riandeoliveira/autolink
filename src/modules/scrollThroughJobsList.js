// const scrollThroughJobsList = async (page) => {
//   const scroll = {
//     min: 0,
//     current: 0,
//     max: 80,
//   };

//   const interval = 50;

//   const jobsArea = await page.$eval(
//     ".jobs-search-results-list",
//     (job) => job.innerText
//   );

//   console.log(jobsArea);

//   //   const scrollInterval = setInterval(() => {
//   //     if (scroll.current <= scroll.max) {
//   //       jobsArea.scrollBy(scroll.min, scroll.current);

//   //       scroll.current++;
//   //     } else clearInterval(scrollInterval);
//   //   }, interval);
// };

// module.exports = scrollThroughJobsList;
