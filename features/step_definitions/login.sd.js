const { When, Then, Given } = require('@cucumber/cucumber');

When(/^I go to url "([^"]*)"$/, async function (url) {
    await browser.url(url);
});