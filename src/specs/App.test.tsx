import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('When a user lands on the home page', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('asks if we can get their location', () => {
    screen.getByText('Can we get your location?');
  });

  it('shows button that allows location access', () => {
    screen.getByText('Yes');
  });

  it('shows button that does not allow location access', () => {
    screen.getByText('No');
  });

  it('shows London when a user click yes we can have their location', async () => {
    const button = screen.getByText('Yes');
    await userEvent.click(button);
    await screen.findByText('London');
  });

  it('shows the sunset time for London', async () => {
    const button = screen.getByText('Yes');
    await userEvent.click(button);
    await screen.findByText('Sunset: 8:22:31 PM');
  });
});

// geolocation not supported on browser - default to London
// geolocation does not work for some reason - default to London
// geolocation is successful so show city name
