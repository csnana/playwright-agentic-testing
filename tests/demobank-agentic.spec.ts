import { expect, test, type Page } from '@playwright/test';

const LOGIN_URL = 'https://demo-bank.ct.digital.ai/login';
const DASHBOARD_URL = 'https://demo-bank.ct.digital.ai/dashboard';

const usernameField = (page: Page) =>
  page.locator('dx-text-box[data-auto="username"]').getByRole('textbox');

const passwordField = (page: Page) =>
  page.locator('dx-text-box[data-auto="password"]').getByRole('textbox');

async function signIn(page: Page) {
  await page.goto(LOGIN_URL);
  await usernameField(page).fill('company');
  await passwordField(page).fill('company');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
}

test('signs in and verifies the dashboard summaries', async ({ page }) => {
  await signIn(page);

  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(
    page.getByText('Welcome to your account, Tester', { exact: true }),
  ).toBeVisible();

  for (const summary of ['Total Balance', 'Income', 'Expanse', 'Last Activity']) {
    await expect(page.getByText(summary, { exact: true })).toBeVisible();
  }

  for (const amount of ['35,000$', '+42000$', '-22000$']) {
    await expect(page.getByText(amount, { exact: true })).toBeVisible();
  }
});

test('shows the observed error after an empty login submission', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(
    page.getByText('Wrong username or password', { exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(LOGIN_URL);
});

test('rejects invalid credentials and remains on the login page', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await usernameField(page).fill('invalid-user');
  await passwordField(page).fill('wrong-password');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await expect(
    page.getByText('Wrong username or password', { exact: true }),
  ).toBeVisible();
  await expect(page).toHaveURL(LOGIN_URL);
});

test('toggles password visibility and the input type', async ({ page }) => {
  await page.goto(LOGIN_URL);

  const password = passwordField(page);
  await expect(password).toHaveAttribute('type', 'password');

  await page.getByRole('button', { name: 'Show', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Hide', exact: true })).toBeVisible();
  await expect(password).toHaveAttribute('type', 'text');

  await page.getByRole('button', { name: 'Hide', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show', exact: true })).toBeVisible();
  await expect(password).toHaveAttribute('type', 'password');
});

test('logs out and returns to the login page', async ({ page }) => {
  await signIn(page);
  await expect(page).toHaveURL(DASHBOARD_URL);

  await page.getByRole('link', { name: 'Logout', exact: true }).click();

  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
});
