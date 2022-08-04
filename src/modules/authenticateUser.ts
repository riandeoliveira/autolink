import { Browser, Page } from "puppeteer";
import { waitForLoading } from ".";
import { input, page } from "../data";
import { EMAIL, PASSWORD } from "../libs/dotenv";

const authenticateUser = async (browser: Browser): Promise<void> => {
  const authPage: Page = await browser.newPage();

  await authPage.goto(page.auth);

  await authPage
    .waitForSelector(input.email)
    .then(() => authPage.type(input.email, EMAIL));

  await authPage
    .waitForSelector(input.password)
    .then(() => authPage.type(input.password, PASSWORD));

  await authPage.evaluate(() => {
    const submitButton = <HTMLElement>(
      document.querySelector(".btn__primary--large")
    );

    submitButton.click();
  });

  await waitForLoading(authPage);
};

export default authenticateUser;
