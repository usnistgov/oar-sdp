import { browser, by, element } from 'protractor';


describe('Search Results Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/search?q="SRD 69"&key=&queryAdvSearch=');
  });

  it('should display top title of Search page', async() => {
    //var EC = protractor.ExpectedConditions;
    const text = await element(by.css('sdp-search h4')).getText();
    expect(text).toContain("SRD 69");
  });
});
