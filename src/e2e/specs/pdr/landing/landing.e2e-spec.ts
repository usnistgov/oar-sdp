// import { LandingPage } from './landing.po';
// import { browser } from 'protractor';

// describe('Landing', function() {
//   let page: LandingPage;

//   beforeEach(() => {
//     page = new LandingPage();
//   });

//   it('**should display heading  ', () => {
//     page.navigateTo().then( function(){
//       //console.log("Test ::"+page.getlandingDivElements().count());
//       expect<any>(page.getlandingDivElements().count()).toBe(72);
//     });

//     it('###should show current url', async() => {
//       page.navigateTo().then( function(){
//          expect(page.getlandingTitle()[0]).toContain('No Landing page available');
//         //expect(browser.getCurrentUrl()).toContain('/#/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
//       }); 
//     });
  
//      it('should show current url2', async() => {
//       page.navigateTo().then( function(){
//       expect(browser.getCurrentUrl()).toContain('/id/3A1EE2F169DD3B8CE0531A570681DB5D1491');
//       });
//     });
   
//   });
// });