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
    await screen.findByText('London: 51.5085,-0.1257');
  });

  it('shows the sunset time', async () => {
    await screen.findByText(
      'The sun will set at 8:22:31 PM, come back then to see the content'
    );
  });
});
