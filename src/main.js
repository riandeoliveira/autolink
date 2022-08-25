const puppeteer = require("puppeteer");
const { page } = require("./data");
const authenticateUser = require("./auth");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  const authPage = await browser.newPage();
  await authPage.goto(page.auth);

  await authenticateUser(authPage);

  const jobsPage = await browser.newPage();
  await jobsPage.goto(page.jobs);

  await jobsPage.evaluate(() => {
    let pageIndex = 0;

    const jobList = [];

    const nextPage = (index) => {
      const pageList = document.querySelectorAll(
        ".artdeco-pagination__indicator"
      );

      pageList[index].children[0].click();

      if (index !== pageList.length) {
        getJobsData();
      } else console.log("TODOS OS DADOS COLETADOS COM SUCESSO!");
    };

    const scrollThroughJobsCardList = () => {
      const scroll = {
        min: 0,
        current: 0,
        max: 80,
      };

      const jobsCardList = document.querySelector(".jobs-search-results-list");

      const interval = setInterval(() => {
        if (scroll.current <= scroll.max) {
          jobsCardList.scrollBy(scroll.min, scroll.current);

          scroll.current++;
        } else clearInterval(interval);
      }, 50);
    };

    const getJobsData = () => {
      scrollThroughJobsCardList();

      setTimeout(() => {
        const jobsElements = document.querySelectorAll(".job-card-list__title");

        let jobIndex = 0;

        const interval = setInterval(() => {
          setTimeout(() => {
            jobsElements[jobIndex].click();
          }, 3000);

          const titleElement = document.querySelector(
            ".jobs-unified-top-card__job-title"
          );
          const companyNameElement = document.querySelector(
            ".jobs-unified-top-card__company-name"
          );
          const regionElement = document.querySelector(
            ".jobs-unified-top-card__bullet"
          );
          const workplaceTypeElement = document.querySelector(
            ".jobs-unified-top-card__workplace-type"
          );
          const postDateElement = document.querySelector(
            ".jobs-unified-top-card__posted-date"
          );

          const title =
            titleElement !== null
              ? titleElement.textContent.trim()
              : "Não informado";
          const companyName =
            companyNameElement !== null
              ? companyNameElement.textContent.trim()
              : "Não informado";
          const region =
            regionElement !== null
              ? regionElement.textContent.trim()
              : "Não informado";
          const workplaceType =
            workplaceTypeElement !== null
              ? workplaceTypeElement.textContent.trim()
              : "Não informado";
          const postDate =
            postDateElement !== null
              ? postDateElement.textContent.trim()
              : "Não informado";

          const applyButton = document.querySelector(
            ".artdeco-button--icon-right"
          );
          const easyApplyButton = document.querySelector(".jobs-apply-button");
          const jobUrl = location.href;

          const job = {
            title,
            companyName,
            region,
            workplaceType,
            postDate,
            jobUrl,
          };

          jobList.push(job);

          console.clear();
          console.table(jobList);

          jobIndex++;

          if (jobIndex === jobsElements.length) {
            clearInterval(interval);

            pageIndex++;

            nextPage(pageIndex);
          }
        }, 5000);
      }, 4000);
    };

    getJobsData();
  });
})();
