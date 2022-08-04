import { Page } from "puppeteer";

const waitForLoading = async (page: Page): Promise<void> => {
  await page.waitForTimeout(5000);
};

export default waitForLoading;
