import { Page } from "puppeteer";
import { waitForLoading } from ".";
import { input } from "../data";
import { EMAIL, PASSWORD } from "../libs/dotenv";

const authenticateUser = async (page: Page): Promise<void> => {
  await page
    .waitForSelector(input.email)
    .then(() => page.type(input.email, EMAIL));

  await page
    .waitForSelector(input.password)
    .then(() => page.type(input.password, PASSWORD));

  await page.evaluate(() => {
    const submitButton = <HTMLElement>(
      document.querySelector(".btn__primary--large")
    );

    submitButton.click();
  });

  await waitForLoading(page);
};

export default authenticateUser;
