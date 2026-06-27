import React from 'react';
import { Card } from 'react-bootstrap';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <Card className="shadow-sm mb-4">
    <Card.Header className="bg-white py-3 px-2 px-sm-3">
      <h2 className="h4 mb-0 text-secondary text-break" style={{ fontSize: '1.2rem' }}>
        {title}
      </h2>
    </Card.Header>
    <Card.Body className="px-2 px-sm-3">{children}</Card.Body>
  </Card>
);