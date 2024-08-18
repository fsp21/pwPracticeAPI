import { test, expect } from '@playwright/test';

test('Navigate to URL', async ({page}) =>{
  
  await page.route('**/*api/articles*', async route => {
    const response = await route.fetch();
    const responseBody = await response.json()
    responseBody.articles[0].title = 'Test Title'
    responseBody.articles[0].description = 'Test Description'
    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  })

  await page.goto('https://conduit.bondaracademy.com/');
  await page.waitForTimeout(2000)
  await expect(page.locator('app-article-list app-article-preview').first().locator('h1')).toContainText('Test Title');
  await expect(page.locator('app-article-list app-article-preview').first().locator('p')).toContainText('Test Description');
})

test('Check if text is displayed', async ({ page }) => {
  await page.route('**/*tags', async route =>{
      const tags = {
        "tags": [
            "asdf","GitHasdfub", "Bondaasdfr"
        ]
      }
    await route.fulfill({
      status: 200,
      contentType: 'application/json; charset=utf-8',
      body: JSON.stringify(tags)
    }) 
  })
  await page.goto('https://conduit.bondaracademy.com/');
  await page.waitForTimeout(2000)
  await expect(page.locator('div', {hasText: "Popular Tags"})).toContainText(["asdf","GitHasdfub", "Bondaasdfr"])
});

