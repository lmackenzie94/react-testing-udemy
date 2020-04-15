import React from 'react';
import { mount } from 'enzyme';

import Congrats from './Congrats';
import { findByTestAttr, checkProps } from '../test/testUtils';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

// const defaultProps = { success: false };

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} testValues - Context values specific to this setup.
 * @returns {ReactWrapper}
 */
const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false; // right side should always be false
  // if someone passes 'false', the or operator will return the right side and
  // if the right side was true, we'd reverse the users intention

  return mount(
    // note: using mount so we can get the contents of Congrats
    <languageContext.Provider value={language}>
      {/* we can overwrite the 'value' by passing a prop (see the code in successContext) */}
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe('languagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });
  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});

test('renders without error', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('renders no text when `success` is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
test('renders non-empty congrats message when `success` is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});
// don't need the below test after switching from props to context
// test('does not throw warning with expected props', () => {
//   const expectedProps = { success: false }; // just needs to be Boolean, value doesn't matter
//   // try changing Boolean to String to see the Fail message
//   checkProps(Congrats, expectedProps);
// });
