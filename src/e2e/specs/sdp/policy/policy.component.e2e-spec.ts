import { browser, by, element } from 'protractor';

describe('Policy Page', function() {
  beforeEach(async () => {
    return await browser.get('/#/policy');
  });

  it('should display title of policy page', async() => {

    var label = await element(by.css('sdp-policy label'));
    expect(label.getText()).toContain('Policy');
  });

});
