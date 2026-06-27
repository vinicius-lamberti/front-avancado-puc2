import React from 'react';
import { Badge } from 'react-bootstrap';

interface AttributeBadgeProps {
  label: string;
  value: string | number;
  bg?: string;
}

export const AttributeBadge: React.FC<AttributeBadgeProps> = ({ label, value, bg = "secondary" }) => (
  <div className="mb-2">
    <strong className="text-muted d-block small text-uppercase">{label}:</strong>
    <Badge bg={bg} className="text-capitalize fs-6 px-3 py-2 mt-1">{value}</Badge>
  </div>
);