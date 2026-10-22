import { getLocalPageUrl } from './utils/local-page';


import { test } from '@playwright/test';
test('compare locator strategies', async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
  const cssLocator = page.locator('#login-button');
  const roleLocator = page.getByRole('button', { name: 'Login' });
  const textLocator = page.locator('button').getByText('Login', { exact: true });
  console.log('CSS locator matches:', await cssLocator.count());
  console.log('Role locator matches:', await roleLocator.count());
  console.log('Text locator matches:', await textLocator.count());
  await cssLocator.click();
  console.log('Clicked Login using CSS locator');
  await roleLocator.click();
  console.log('Clicked Login using role locator');
  await textLocator.click();
  console.log('Clicked Login using text locator');
});
