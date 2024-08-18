import { test, expect } from '@playwright/test';

test.beforeEach('Navigate to URL', async ({page}) =>{
  await page.route('**/*tags', async route =>{
    const tags = {
      "tags": [
          "asdf",
          "GitHasdfub",
          "Coding",
          "Bondaasdfr Academy",
          "Gdddit",
          "Zoom",
          "YouTube",
          "qa career",
          "Collaboration",
          "Value-Focused"
      ]
  }
  await route.fulfill({
    status: 200,
    contentType: 'application/json; charset=utf-8',
    body: JSON.stringify(tags)
  })
  
  })
  await page.goto('https://conduit.bondaracademy.com/');
})

test('Check if text is displayed', async ({ page }) => {
  await page.waitForTimeout(2000)
  //await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('div', {hasText: "Popular Tags"})).toContainText(["asdf","GitHasdfub", "Bondaasdfr"])
});

