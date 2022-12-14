const puppeteer = require("puppeteer");
const { page } = require("./data");
const authenticateUser = require("./auth");
const { sendMessageToBot } = require("./libs/telegraf");

const runBot = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: ["--start-maximized"],
    // defaultViewport: null,
  });

  const authPage = await browser.newPage();
  await authPage.goto(page.auth);

  await authenticateUser(authPage);

  const jobsPage = await browser.newPage();
  await jobsPage.goto(page.jobs);

  const fetchJobsData = async () => {
    return await jobsPage.evaluate(() => {
      return new Promise((resolve) => {
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

          const jobsCardList = document.querySelector(
            ".jobs-search-results-list"
          );

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
            const jobsElements = document.querySelectorAll(
              ".job-card-list__title"
            );

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
                  : "N??o informado";
              const companyName =
                companyNameElement !== null
                  ? companyNameElement.textContent.trim()
                  : "N??o informado";
              const region =
                regionElement !== null
                  ? regionElement.textContent.trim()
                  : "N??o informado";
              const workplaceType =
                workplaceTypeElement !== null
                  ? workplaceTypeElement.textContent.trim()
                  : "N??o informado";
              const postDate =
                postDateElement !== null
                  ? postDateElement.textContent.trim()
                  : "N??o informado";

              const applyButton = document.querySelector(
                ".artdeco-button--icon-right"
              );
              const easyApplyButton =
                document.querySelector(".jobs-apply-button");
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

                resolve(jobList);

                // pageIndex++;
                // nextPage(pageIndex);
              }
            }, 5000);
          }, 4000);
        };

        getJobsData();

        return jobList;
      });
    });
  };

  const jobsData = await fetchJobsData();

  let index = 0;

  setInterval(() => {
    sendMessageToBot(`
Nova Vaga Encontrada!

T??tulo: ${jobsData[index].title}

Empresa: ${jobsData[index].companyName}

Regi??o: ${jobsData[index].region}

Modalidade: ${jobsData[index].workplaceType}

Data: ${jobsData[index].postDate}

Link: ${jobsData[index].jobUrl}
`);

    index++;
  }, 5000);

  console.log(jobsData);
};

module.exports = runBot;
