import React from 'react';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

/**
 * Functional react component for congrats message.abs
 * @function
 * @returns {JSX.Element} - Rendered component (or null)
 */
const Congrats = () => {
  const [success] = successContext.useSuccess(); // our custom hook
  const language = React.useContext(languageContext);
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;
