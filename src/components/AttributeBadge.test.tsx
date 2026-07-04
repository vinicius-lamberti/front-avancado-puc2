import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AttributeBadge } from './AttributeBadge';

describe('Componente AttributeBadge', () => {
  it('deve renderizar o rótulo e o valor fornecidos por props', () => {
    render(<AttributeBadge label="Editora" value="Harper Collins" bg="info" />);

    const labelElement = screen.getByText('Editora:');
    const valueElement = screen.getByText('Harper Collins');

    expect(labelElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });
});