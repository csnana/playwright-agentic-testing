import { getLocalPageUrl } from './utils/local-page';

import { test, expect } from '@playwright/test';
test('add product quantity to cart', async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
  const tshirt = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'Cotton T-shirt' })
  });
  await tshirt.getByLabel('Quantity').fill('3');
  await tshirt.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 3');
  console.log('Cart count updated correctly');
});