import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';
import { findByTestAttr, checkProps } from '../test/testUtils';

/**
 * Setup function for Input component
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
};
test('Input renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});
test('Renders without error given props', () => {
  checkProps(Input, { secretWord: 'party' });
});
