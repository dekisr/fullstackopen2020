import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<CourseParts> = ({ parts }) => (
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
