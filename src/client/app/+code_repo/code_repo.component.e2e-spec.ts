describe('About', () => {

  beforeEach( () => {
    browser.get('/code_repo');
  });

  it('should have correct feature heading', () => {
    expect(element(by.css('sd-about h2')).getText()).toEqual('Features');
  });

});
