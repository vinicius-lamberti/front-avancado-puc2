import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfoCard } from './InfoCard';

describe('Componente InfoCard', () => {
  it('deve renderizar o título do card e os componentes filhos', () => {
    render(
      <InfoCard title="Sessão de Teste">
        <p>Conteúdo interno do card</p>
      </InfoCard>
    );
    
    expect(screen.getByRole('heading', { name: 'Sessão de Teste' })).toBeInTheDocument();
    expect(screen.getByText('Conteúdo interno do card')).toBeInTheDocument();
  });
});