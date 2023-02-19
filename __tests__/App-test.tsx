/**
 * @format
 */

import * as React from 'react';
import 'react-native';
import Home from '../src/screens/Home';
import {render} from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe('<Home/>', () => {
  it('render Home', () => {
    const component = render(<Home />);
    expect(component).toBeDefined();
  });
});
