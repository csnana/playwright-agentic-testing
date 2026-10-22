import { getLocalPageUrl } from './utils/local-page';

import { test, expect } from '@playwright/test';
async function addProductToCart(page: import('@playwright/test').Page, productName: string, quantity: string) {
  const product = page.locator('section').filter({
    has: page.getByRole('heading', { name: productName })
  });
  await product.getByLabel('Quantity').fill(quantity);
  await product.getByRole('button', { name: 'Add to cart' }).click();
}
test.beforeEach(async ({ page }) => {
  await page.goto(getLocalPageUrl('tests/pages/day3.html'));
});
test('add two T-shirts to cart', async ({ page }) => {
  await addProductToCart(page, 'Cotton T-shirt', '2');
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 2');
});
test('add three polos to cart', async ({ page }) => {
  await addProductToCart(page, 'Cotton Polo', '3');
  await expect(page.locator('#cart-count')).toHaveText('Items in cart: 3');
});