import React from 'react';
import { Card } from 'react-bootstrap';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <Card className="shadow-sm mb-4">
    <Card.Header className="bg-white py-3">
      <h2 className="h4 mb-0 text-secondary">{title}</h2>
    </Card.Header>
    <Card.Body>{children}</Card.Body>
  </Card>
);