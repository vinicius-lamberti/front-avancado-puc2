import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './PageHeader';

describe('Componente PageHeader', () => {
  it('deve renderizar o título principal e o subtítulo opcional', () => {
    render(<PageHeader title="Meus Livros" subtitle="Lista de leitura" />);
    
    expect(screen.getByRole('heading', { name: 'Meus Livros' })).toBeInTheDocument();
    expect(screen.getByText('Lista de leitura')).toBeInTheDocument();
  });
});