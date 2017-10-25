
import { browser, by, element } from 'protractor';

describe('App', () => {
  browser.ignoreSynchronization=true

  beforeEach(async () => {
    return await browser.get('/#');
  });

  it('should have a title', async () => {
    const title = await browser.getTitle();
    expect(title).toEqual('NIST Data Repository Page');
  });
});
