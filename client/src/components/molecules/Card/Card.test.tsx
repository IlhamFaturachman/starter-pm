import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

describe('Card', () => {
  it('renders title and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Hello</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});
