import { test, expect } from '@playwright/test';

declare const require: any;
const fs = require('fs');

test('DemoQA Book Store Application', async ({ page }) => {

  // User Credentials
  const TEST_USER_EMAIL = 'gumpuvinodkumar96@gmail.com';
  const TEST_USER_PASSWORD = 'Gumpu@2000';

  // Open Application
  await page.goto('https://demoqa.com/');

  // Homepage Screenshot
  await page.screenshot({

    path: 'test-results/homePage.png'
  });

  // Click Book Store Application
  await page.click('text=Book Store Application');

  // Click Login
  await page.click('#login');

  // Enter Username
  await page.fill('#userName', TEST_USER_EMAIL);

  // Enter Password
  await page.fill('#password', TEST_USER_PASSWORD);

  // Login Page Screenshot
  await page.screenshot({

    path: 'test-results/loginPage.png'
  });

  // Click Login Button
  await page.click('#login');

  // Validate Username
  await expect(page.locator('#userName-value'))
    .toHaveText(TEST_USER_EMAIL);

  // Validate Logout Button
  await expect(
    page.getByRole('button', { name: 'Logout' })
  ).toBeVisible();

  // Dashboard Screenshot
  await page.screenshot({

    path: 'test-results/dashboard.png'
  });

  // Click Go To Book Store
  await page.getByRole('button', { name: 'Go To Book Store' }).click();

  // Search Book
  const bookName = 'Learning JavaScript Design Patterns';

  await page.fill('#searchBox', bookName);

  // Book Search Screenshot
  await page.screenshot({

    path: 'test-results/bookSearch.png'
  });

  // Validate Book
  await expect(
    page.locator("//a[text()='Learning JavaScript Design Patterns']")
  ).toBeVisible();

  // Capture Book Details
  const title = await page.locator(
    "//a[text()='Learning JavaScript Design Patterns']"
  ).textContent();

  const author = await page.locator(
    "//td[text()='Addy Osmani']"
  ).textContent();

  const publisher = await page.locator(
    `//td[text()="O'Reilly Media"]`
  ).textContent();

  // Print in Console
  console.log(title);
  console.log(author);
  console.log(publisher);

  // Write Details into File
  fs.writeFileSync(

    'bookDetails.txt',

    `Title : ${title}
Author : ${author}
Publisher : ${publisher}`
  );

  // Logout
  await page.locator("//button[text()='Log out']").click();


  // Logout Screenshot
  await page.screenshot({

    path: 'test-results/logout.png'
  });

});