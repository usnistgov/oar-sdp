import { SearchPanelModule } from './search-panel.module';

describe('SearchPanelModule', () => {
  let searchPanelModule: SearchPanelModule;

  beforeEach(() => {
    searchPanelModule = new SearchPanelModule();
  });

  it('should create an instance', () => {
    expect(searchPanelModule).toBeTruthy();
  });
});
