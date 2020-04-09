import checkPropTypes from 'check-prop-types';

// ABSTRACTIONS
// -- we didnt abstract setup() because it's too different for each component

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`); // data-test is our choice; can be anything
};

export const checkProps = (component, conformingProps) => {
  // see 'check-prop-types' docs for details:
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};
