import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import App from '../App';

describe('When a user lands on the home page', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('shows the title', () => {
    screen.getByText('Frontend with github actions');
  });
});
