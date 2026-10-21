import { expect, test, type Page } from '@playwright/test';

const LOGIN_URL = 'https://demo-bank.ct.digital.ai/login';
const DASHBOARD_URL = 'https://demo-bank.ct.digital.ai/dashboard';

const usernameField = (page: Page) =>
  page.locator('dx-text-box[data-auto="username"]').getByRole('textbox');

const passwordField = (page: Page) =>
  page.locator('dx-text-box[data-auto="password"]').getByRole('textbox');

test('a $1 transfer reduces the displayed balance', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await usernameField(page).fill('company');
  await passwordField(page).fill('company');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(
    page.getByText('Welcome to your account, Tester', { exact: true }),
  ).toBeVisible();

  const balance = page.locator('[data-auto="total-balance-amount"]');
  await expect(balance).toHaveText(/^\d[\d,]*\$$/);
  const startingBalance = Number((await balance.innerText()).replace(/[,$]/g, ''));

  await page.getByRole('button', { name: 'Transfer Funds', exact: true }).click();
  await page.getByRole('textbox', { name: 'NAME', exact: true }).fill('Test Recipient');
  await page.getByRole('textbox', { name: 'PHONE', exact: true }).fill('5550100');
  await page.getByRole('textbox', { name: 'AMOUNT', exact: true }).fill('1');

  await page.locator('dx-text-box[data-auto="country"]').getByRole('textbox').click();
  await page.getByRole('option', { name: /Canada/ }).click();

  await page.locator('dx-button[data-auto="transfer-button"]').click();

  await expect.poll(async () => {
    const balanceText = await balance.innerText();
    return Number(balanceText.replace(/[,$]/g, ''));
  }).toBeLessThan(startingBalance);
});
