// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');

When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
    await browser.maximizeWindow();
});

When(/^I check the texts of the elements:$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        expect(await $(row.selector).getText())
            .toEqual(row.text)
    }
});

When(/^I expect element: "([^"]*)" (text|value): "([^"]*)"$/, async function (selector, type, text) {
    const methods = {
        text: 'getText',
        value: 'getValue'
    }
    expect(await $(selector)[methods[type]]())
        .toEqual(text)
});

When('I go to {string} menu item', async function (item) {
    await $('a[href="./formUser.html"]').click();
});

When(/^I fill form:$/, async function (formYaml) {
    const formData = YAML.parse(formYaml);
   // console.log({ formData });
    const fieldsToFill = ["email", "password", "address1","address2", "city","zip", "description"];
        const fillFormUsingYaml = async function (obj, userForm) {
            for (const field in userForm) {
              await $(`#${userForm[field]}`).setValue(obj[`${userForm[field]}`]);
            }
          };
          await $("//a[contains(@href,'./formUser.html')]").click();
          await fillFormUsingYaml(formData, fieldsToFill);
          await $('#dashboard > div > div > div > form > button').click(); //rewrite selector
});

When('I login as: {string}, {string}', async function (login, password) {
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $("#spinner").waitForDisplayed({ reverse: true, timeout: 15000 });
});

When(/^I log in as :$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        await $('#login').setValue(row.login);
        await $('#password').setValue(row.password);
    }
});

When ('I click Login button', async function() {
    await $('button').click();
});

Then('I expect error message Fail to login', async function () {
    expect(await $('#error').getText())
        .toEqual("Fail to login")
});

Then('I expect all fields are displayed corresponding data' , async function () { 
 const emailText = await $('//div[text()="test@test.com"]').getText(); 
 const address1Text = await $('//div[text()="test@test.com"]/following-sibling::div[@tabulator-field="address1"]').getText(); 
 const address2Text = await $('//div[text()="test@test.com"]/following-sibling::div[@tabulator-field="address2"]').getText(); 
 const cityText =  await $('//div[text()="test@test.com"]/following-sibling::div[@tabulator-field="city"]').getText(); 
 const zipText =  await $('//div[text()="test@test.com"]/following-sibling::div[@tabulator-field="zip"]').getText(); 
 const descriptionText = await $('//div[text()="test@test.com"]/following-sibling::div[@tabulator-field="description"]').getText(); 

    if (!emailText.includes("test@test.com")) {
        throw new Error('Wrong email')
    }
    if (!address1Text.includes("International str")) {
        throw new Error('Wrong adress1')
    }
    if (!address2Text.includes("apartment 123")) {
        throw new Error('Wrong adress2')
    } 
    if (!cityText.includes("Minsk")) {
        throw new Error('Wrong city')
    }
    if (!zipText.includes("KT00MP")) {
        throw new Error('Wrong zip')
    }
    if (!descriptionText.includes("test user")) {
        throw new Error('Wrong description')
    }
});