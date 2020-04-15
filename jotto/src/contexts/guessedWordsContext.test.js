import React from 'react';
import { shallow, mount } from 'enzyme';
import guessedWordsContext from './guessedWordsContext';

// a function comp that calls useGuessedWords for our tests
const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div></div>;
};

test('useGuessedWords throws error when not wrapped in GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});

test('useGuessedWords does not throw error when wrapped in GuessedWordsProvider', () => {
  expect(() => {
    // need to use mount to 'see' into the FunctionalComponent where useGuessedWords is called
    // shallow would have only rendered the Provider and used a placeholder for the functional component
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow();
});
