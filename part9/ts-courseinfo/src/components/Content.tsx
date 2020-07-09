import React from 'react';
import { CourseParts } from '../types';

const Content: React.FC<CourseParts> = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <li key={part.name}>
          {part.name}: <strong>{part.exerciseCount}</strong>
        </li>
      ))}
    </ul>
  );
};

export default Content;
