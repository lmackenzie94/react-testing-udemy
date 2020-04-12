import stringsModule from './strings';
const { getStringByLanguage } = stringsModule; // can destructure here bc we're not mocking 'getStringByLanguage' in these tests

const strings = {
  en: { submit: 'submit' },
  emoji: {
    submit: '🚀',
  },
  mermish: {},
};

describe('getStringByLanguage', () => {
  // mocking console.warn will hide the warnings from our test output
  const mockWarn = jest.fn();
  let originalWarn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });
  afterEach(() => {
    // this ensures console.warn isn't mocked in future tests that are added
    console.warn = originalWarn;
  });

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test('returns correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
    expect(mockWarn).not.toHaveBeenCalled();
  });
  test('returns english submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for [notALanguage]'
    );
  });
  test('returns english submit string when key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(
      'Could not get string [submit] for [mermish]'
    );
  });
});

// we want to be able to see this warning in the test output
// in the above test, we DON'T, but that's intentional
// this is why the afterEach above is important to unmock console.warn
test('console.warn shows in test output', () => {
  console.warn('WARNING!!');
});
