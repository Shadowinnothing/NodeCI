const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('the header has the correct text', async () => {
  expect(await page.getContentsOf('a.brand-logo')).toEqual('Blogster');
});

test('clicking login starts OAuth flow', async () => {
  await page.click('.right a');
  const url = await page.url();

  // The Ryan Way
  //expect(url).toMatch(url.split('/')[2]);
  expect(url).toMatch(/accounts\.google\.com/);
});

test('when signed in, shows login button', async () => {
  await page.login();
  const button = await page.getContentsOf('a[href="/auth/logout"]');
  expect(button).toEqual('Logout');
});
