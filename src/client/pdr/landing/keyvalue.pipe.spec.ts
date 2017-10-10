import { KeyValuePipe } from './keyvalue.pipe';
export function main() {
describe('KeyValuePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new KeyValuePipe();
  let entry = "{title : 'Test Title'}";
  let keyval = [];

  it('transforms entry to key value', () => {
      keyval.push({key: 'title', value: 'Test Title'});
      expect(pipe.transform(entry)).toBe(keyval);
  });
  it('transforms this entry to key value ', () => {
    expect(pipe.transform('keyval')).toBe('keyval');
  });
});
}
