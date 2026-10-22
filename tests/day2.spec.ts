import { test, expect, type Browser, type Page } from '@playwright/test';
let browser: Browser;
let page: Page;
test.beforeAll(async ({ playwright }) => {
  browser = await playwright.webkit.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  console.log('Browser launched');
});
test.beforeEach(async () => {
  await page.goto('https://playwright.dev/');
});
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `test-results/${testInfo.title.replace(/\s+/g, '-')}.png`,
      fullPage: true
    });
  }
});
test('homepage title is correct', async () => {
  await expect(page).toHaveTitle(/Playwright/);
});
test('Get started link is visible', async () => {
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await page.waitForTimeout(10_000);
});
test.afterAll(async () => {
  await browser.close();
  console.log('Browser closed');
});