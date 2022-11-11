import { screen, render } from '@testing-library/react';
import App from '../App';

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
    await screen.findByText('The sun will set at', { exact: false });
  });

  it('shows location disclaimer', async () => {
    await screen.findByText('The location is determined by your ip address');
  });
});
