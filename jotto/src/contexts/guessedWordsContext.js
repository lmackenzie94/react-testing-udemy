import React from 'react';

const guessedWordsContext = React.createContext();

/**
 * @function useGuessedWords
 * @returns {Array} guessedWordsContext value, which is a state of [value, setter]
 */
function useGuessedWords() {
  const context = React.useContext(guessedWordsContext);
  // if context doesn't exist, it means we tried to use this function outside a Provider
  if (!context) {
    throw new Error(
      'useGuessedWords must be used within a GuessedWordsProvider'
    );
  }
  return context;
}

/**
 * @function guessedWordsProvider
 * @param {object} props - props to pass through from a declared component
 * @returns {JSX.Element} Provider component
 */
function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = React.useState([]);
  // useMemo ensures the provider value will only update when guessedWords updates
  // no need to test this - React tests useMemo for us!
  const value = React.useMemo(() => [guessedWords, setGuessedWords], [
    guessedWords,
  ]);

  return <guessedWordsContext.Provider value={value} {...props} />;
}

// do this for easier mocking so we can replace properties on the default export
export default {
  GuessedWordsProvider,
  useGuessedWords,
};
