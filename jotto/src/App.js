import React, { Component } from 'react';
import './App.css';
// import GuessedWords from './GuessedWords';
// import Congrats from './Congrats';
import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext';

import LanguagePicker from './LanguagePicker';
import Input from './Input';

/**
 * reducer to update state, called automatically by dispatch
 * @param {object} state - existing state
 * @param {object} action - contains 'type' and 'payload' properties for the state update
 *                          for example: {type: "setSecretWord", payload: "party"}
 * @return {object} - new state
 */
// state gets passed in automatically
function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en',
  });

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });
  const setLanguage = ({ language }) =>
    dispatch({ type: 'setLanguage', payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  // REMEMBER: don't need an 'else' because if the above 'returns', the code below will never run

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      {/* 'value' is reachable from anywhere within the provider, at any level */}
      {/* any time state.language changes, all children will re-render */}
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Input secretWord={state.secretWord} />
      </languageContext.Provider>
    </div>
  );
};

export default App;
