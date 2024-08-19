import {Page,Locator} from "@playwright/test"

export class ConduitPage {
    readonly page: Page
    readonly titleOfFirstArticle: Locator
    readonly descriptionOfFirstArticle: Locator 

    constructor(page: Page){
        this.page = page
        this.titleOfFirstArticle = page.locator('app-article-list app-article-preview').first().locator('h1')
        this.descriptionOfFirstArticle = page.locator('app-article-list app-article-preview').first().locator('p')
    }

}