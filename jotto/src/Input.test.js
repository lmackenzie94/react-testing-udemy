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

describe('state controlled input field', () => {
  let wrapper;
  let mockSetCurrentGuess = jest.fn(); // we don't care what this returns (spy function)
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]); // this will be run instead of the real useState
    wrapper = setup();
  });
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} }); // passing an 'event' with function that does nothing (get error without this)
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
