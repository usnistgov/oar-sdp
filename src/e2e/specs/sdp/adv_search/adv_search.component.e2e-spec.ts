import { browser, by, element } from 'protractor';

describe('Advanced Search Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/advanced');
  });

  it('should display title of advanced search page', async() => {
    browser.sleep(1000);
    var label = element.all(by.css('sdp-advsearch label'));
    expect(label.get(0).getText()).toContain('Advanced Search Builder');
  });

});
