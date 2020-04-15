import React from 'react';

const successContext = React.createContext();

/**
 * @function useSuccess
 * @returns {Array} SuccessContext value, which is a state of [value, setter]
 */
function useSuccess() {
  const context = React.useContext(successContext);
  // if context doesn't exist, it means we tried to use this function outside a Provider
  if (!context) {
    throw new Error('useSuccess must be used within a SuccessProvider');
  }
  return context;
}

/**
 * @function SuccessProvider
 * @param {object} props - props to pass through from a declared component
 * @returns {JSX.Element} Provider component
 */
function SuccessProvider(props) {
  const [success, setSuccess] = React.useState(false);
  const value = React.useMemo(() => [success, setSuccess], [success]);
  return <successContext.Provider value={value} {...props} />; // spreading props allows us to potentially overwrite 'value' in our tests
}

// do this for easier mocking so we can replace properties on the default export
export default {
  SuccessProvider,
  useSuccess,
};

/* 
TESTING NOTES:
- test that useSuccess throws an error if used outside provide
- AND doesn't throw an error when inside provider
- anything else is basically testing React functions (not our job!)
- Make a fake functional component and call useSuccess inside
- use Jest toThrow()
*/
