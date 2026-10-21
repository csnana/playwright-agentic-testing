import { expect, test, type Page } from '@playwright/test';

const LOGIN_URL = 'https://demo-bank.ct.digital.ai/login';
const DASHBOARD_URL = 'https://demo-bank.ct.digital.ai/dashboard';

const usernameField = (page: Page) =>
  page.locator('dx-text-box[data-auto="username"]').getByRole('textbox');

const passwordField = (page: Page) =>
  page.locator('dx-text-box[data-auto="password"]').getByRole('textbox');

test('inspects the transfer form and cancels without submitting', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await usernameField(page).fill('company');
  await passwordField(page).fill('company');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(
    page.getByText('Welcome to your account, Tester', { exact: true }),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Transfer Funds', exact: true }).click();

  const name = page.getByRole('textbox', { name: 'NAME', exact: true });
  const phone = page.getByRole('textbox', { name: 'PHONE', exact: true });
  const amount = page.getByRole('textbox', { name: 'AMOUNT', exact: true });
  const country = page
    .locator('dx-text-box[data-auto="country"]')
    .getByRole('textbox');

  await expect(name).toBeVisible();
  await expect(name).toHaveAttribute('type', 'text');
  await expect(phone).toBeVisible();
  await expect(phone).toHaveAttribute('type', 'text');
  await expect(amount).toBeVisible();
  await expect(amount).toHaveAttribute('type', 'number');
  await expect(page.getByText('COUNTRY', { exact: true })).toBeVisible();
  await expect(country).toBeVisible();
  await expect(country).toHaveAttribute('type', 'text');

  await country.click();
  await expect(page.getByRole('option', { name: /Canada/ })).toBeVisible();

  await page.getByRole('button', { name: 'Cancel', exact: true }).click();

  await expect(name).toBeHidden();
  await expect(page.getByText('Welcome to your account, Tester', { exact: true })).toBeVisible();
});
