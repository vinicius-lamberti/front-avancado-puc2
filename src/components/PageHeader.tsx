import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <header className="mb-4 pb-2 border-bottom">
    <h1 className="display-5 fw-bold">{title}</h1>
    {subtitle && <p className="lead text-muted">{subtitle}</p>}
  </header>
);