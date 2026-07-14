import { render } from '@testing-library/react';
import { AuthIllustration } from './AuthIllustration';

describe('AuthIllustration', () => {
  it('renders an svg illustration', () => {
    const { container } = render(<AuthIllustration />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
