import { browser, by, element } from 'protractor';

describe('FAQ Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/faq');
  });

  it('should display title of faq page', async() => {

    var label = await element(by.css('sdp-faq label'));
    expect(label.getText()).toContain('FAQ');
  });

});
