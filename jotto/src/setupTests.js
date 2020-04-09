// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// the above comes default with CRA

// THIS IS CUSTOM ------------------------------
// it will be run before EVERY test file so we don't have to include this manually in every one
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
// EnzymeAdapter tells Enzyme we're using React 16 so it knows how to build the virtual DOM
Enzyme.configure({ adapter: new EnzymeAdapter() });

// if not using CRA, use 'setupFilesAfterEnv' in jest.config.js (video 37 of course)
