import { browser, by, element } from 'protractor';


describe('Search Results Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/search?q="SRD 69"&key=&queryAdvSearch=');
  });

  it('should display top title of Search page', async() => {
    browser.sleep(1000);
    const text = await element(by.css('sdp-search h4')).getText();
    expect(text).toContain("SRD 69");
  });
});
