import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpotifyListItem from './SpotifyListItem';

describe('Teste do botão do spotify do sidebar', () => {
  const renderComponent = (isLoggedIn) => {
    return render(<SpotifyListItem isLoggedIn={isLoggedIn} />);
  };

  test('uses jest-dom', () => {
    renderComponent(true);

    expect(screen.getByTestId('meuteste')).toHaveAttribute(
      'href',
      '/api/logout'
    );
  });

  test('mudança de prop', () => {
    const { rerender } = renderComponent(true);
    rerender(<SpotifyListItem isLoggedIn={false} />);

    expect(screen.getByTestId('meuteste')).toHaveAttribute(
      'href',
      '/auth/spotify'
    );
  });
});
