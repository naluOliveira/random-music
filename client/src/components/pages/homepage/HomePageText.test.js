import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePageText from './HomePageText';

describe('', () => {
  const renderComponent = () => {
    return render(<HomePageText />);
  };

  test('uses jest-dom', () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });
});
