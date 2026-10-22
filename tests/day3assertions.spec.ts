import { getLocalPageUrl } from './utils/local-page';


import { test, expect } from '@playwright/test';
test('verify shopping page state', async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
  const username = page.getByLabel('Username');
  await expect(username).toBeVisible();
  await expect(username).toHaveValue('');
  await username.fill('testuser');
  await expect(username).toHaveValue('testuser');
  const cartCount = page.locator('#cart-count');
await expect(cartCount).toHaveText('Items in cart: 7');
  console.log('All assertions passed');
});
