import moxios from 'moxios';
import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  // returns axios to its 'http' state
  afterEach(() => {
    moxios.uninstall();
  });

  // needs to be async so we can await our moxios answer
  test('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party';

    // handle any axios calls that occur during the test
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      // this response is equivalent to what we'd get from the random word server
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    // mock setSecretWord, call getSecretWord with the mock, & make sure mock was called with the response from moxios
    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord); // this makes an axios call which will be handled by moxios
    // see whether mock was run with the correct argument
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
