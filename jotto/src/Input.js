import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState(''); // we need to do this in order to mock useState
  const language = React.useContext(languageContext);

  return (
    <div data-test="component-input" type="text">
      <form className="form-inline">
        <input
          type="text"
          data-test="input-box"
          className="mb-2 mx-sm-3"
          placeholder={stringsModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          type="submit"
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            setCurrentGuess('');
          }}
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
