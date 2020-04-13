import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';

import hooksActions from './actions/hookActions'; // NOTE: destructuring 'getSecretWord' here would cause issues

const mockGetSecretWord = jest.fn(); // don't need this to return anything; we're just "spying" on it so we can make assertions

/**
 * Setup function for App component
 * @param {string} secretWord - desired secretWord state value for test
 * @returns {ReactWrapper}
 */
const setup = (secretWord = 'party') => {
  // if we don't clear, any calls from previous tests will carry through
  mockGetSecretWord.mockClear();
  hooksActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest
    .fn()
    .mockReturnValue([{ secretWord, language: 'en' }, jest.fn()]);
  React.useReducer = mockUseReducer;

  // use 'mount', because useEffect is not called on 'shallow'
  return mount(<App />);
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });
  test('getSecretWord does not run on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear(); // need this otherwise Enzyme will remember the call in the test above (on mount)
    wrapper.update(); // triggers a component update
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });
  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  test('renders spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(false);
  });
});
