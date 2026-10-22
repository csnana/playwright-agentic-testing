import { getLocalPageUrl } from './utils/local-page';


import { test } from '@playwright/test';
test('fill login fields using accessible locators', async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
   const elements = page.getByRole('button');
  const count = await elements.count();
  console.log('Total DOM elements:', count);
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    console.log({
      tag: await element.evaluate(el => el.tagName.toLowerCase()),
      id: await element.getAttribute('id'),
      role: await element.getAttribute('role'),
      text: (await element.innerText().catch(() => '')).trim().slice(0, 80)
    });
  }
  await page.waitForTimeout(10_000);
  await page.getByLabel('Username').fill('testuser');
  await page.getByPlaceholder('Enter password').fill('testpassword');
  console.log('Login fields filled');
  await page.waitForTimeout(10_000);
});
