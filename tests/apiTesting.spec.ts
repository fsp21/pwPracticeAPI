import { test, expect } from '@playwright/test';

test('Navigate to URL [mocking API response entirely]', async ({page}) =>{
  
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
  await page.waitForTimeout(2000) // small timeout for Playwright to wait until the modified request is processed
  await expect(page.locator('app-article-list app-article-preview').first().locator('h1')).toContainText('Test Title');
  await expect(page.locator('app-article-list app-article-preview').first().locator('p')).toContainText('Test Description');
})

test('Check if text is displayed [modifying response from API]', async ({ page }) => {
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
  await page.waitForTimeout(2000) // small timeout for Playwright to wait until the modified request is processed
  await expect(page.locator('div', {hasText: "Popular Tags"})).toContainText(["asdf","GitHasdfub", "Bondaasdfr"])
});

test('Making requests', async ({ page, request }) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {"user":{"email":"testEmail@testmail.net","password":"Welcome1"}}
  })
  const responseBody = await response.json()
  const accessToken = responseBody.user.token

  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/',{
    data: {
      "article":{"title":"m8ock article title test1234","description":"9mock article description test1234","body":"1234mock article body test","tagList":[]}
    },
    headers: {
      "Authorization": `Token ${accessToken}`
    }
  })
  expect(articleResponse.status()).toBe(201)

})