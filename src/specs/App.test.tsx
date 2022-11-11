import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('When a user lands on the home page', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('asks if we can get their location', () => {
    screen.getByText('Can we use your location?');
  });

  it('shows button that allows location access', () => {
    screen.getByText('Yes');
  });

  it('shows button that does not allow location access', () => {
    screen.getByText('No');
  });
});

describe('When a user allows location services', () => {
  beforeEach(async () => {
    render(<App />);
    const yesButton = screen.getByText('Yes');
    await userEvent.click(yesButton);
  });

  it('shows loading state', () => {
    screen.getByText('Locating...');
  });
});
