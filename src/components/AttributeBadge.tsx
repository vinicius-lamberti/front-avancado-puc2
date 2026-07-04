import React from 'react';
import { Badge } from 'react-bootstrap';

interface AttributeBadgeProps {
  label: string;
  value: string | number;
  bg?: string;
}

export const AttributeBadge: React.FC<AttributeBadgeProps> = ({ label, value, bg = "secondary" }) => (
  <div className="mb-2 text-break w-100">
    <strong className="text-muted d-block small text-uppercase" style={{ fontSize: '0.75rem' }}>
      {label}:
    </strong>
    <Badge 
      bg={bg} 
      className="text-capitalize mt-1 d-block w-100 text-wrap py-2"
      style={{ 
        fontSize: '0.85rem', 
        whiteSpace: 'normal', 
        lineHeight: '1.2' 
      }}
    >
      {value}
    </Badge>
  </div>
);