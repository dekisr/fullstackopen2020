import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  parts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ parts }) => (
  <>
    <hr />
    <p>
      Number of exercises:{' '}
      <strong>
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </strong>
    </p>
  </>
);

export default Total;
