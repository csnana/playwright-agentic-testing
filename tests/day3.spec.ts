import { test, expect } from '@playwright/test';
test('Playwright automatically waits for assertions', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const heading = page.getByRole('heading', { name: /reliable web automation/ });
  await expect(heading).toBeVisible();
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  console.log('Both assertions passed.');
  await page.waitForTimeout(10_000);
});