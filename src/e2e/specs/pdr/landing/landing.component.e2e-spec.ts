import { LandingPage } from './landing.po';
import { browser } from 'protractor';

describe('Landing', function() {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should display heading ', () => {
    page.navigateTo().then( function(){
      //console.log("Test ::"+page.getlandingDivElements().count());
      expect<any>(page.getlandingDivElements().count()).toBe(2);
    });
   
  });
});