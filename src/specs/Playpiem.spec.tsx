import { screen, render } from '@testing-library/react';
import App from '../App';
import { getLocation500 } from '../fakeServer/location-by-ip/location-by-ip';
import { getSunriseAndSunset500 } from '../fakeServer/sunrise-and-sunset/sunrise-and-sunset';

describe('When a user lands on the holding page', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('shows a loading state', () => {
    screen.getByText('Locating...');
  });

  it('eventually renders the location', async () => {
    await screen.findByText('London');
  });

  it('shows the sunset time', async () => {
    await screen.findByText('Sunset:', { exact: false });
  });

  it('shows location disclaimer', async () => {
    await screen.findByText('The location is determined by your ip address');
  });
});

describe('when the location request fails', () => {
  beforeEach(() => {
    getLocation500();
    render(<App />);
  });

  it('default to london as the location', async () => {
    screen.getByText('Locating...');
    await screen.findByText('London');
  });
});

describe('when the sunset request fails', () => {
  beforeEach(() => {
    getSunriseAndSunset500();
    render(<App />);
  });

  it('displays error text', async () => {
    screen.getByText('Locating...');
    await screen.findByText('Something went wrong, please try again');
  });
});
