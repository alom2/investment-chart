import React from 'react'
import { render } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('should render children', () => {
    const { getByText } = render(<Card>Teste</Card>);
    const childrenComponent = getByText(/Teste/i);
    expect(childrenComponent).toBeInTheDocument();
  })
});