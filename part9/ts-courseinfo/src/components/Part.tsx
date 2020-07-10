import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const renderPart = (part: CoursePart) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <li>
          Description: <strong>“{part.description}”</strong>
        </li>
      );
    case 'Using props to pass data':
      return (
        <li>
          Group Project Count: <strong>{part.groupProjectCount}</strong>
        </li>
      );
    case 'Deeper type usage':
      return (
        <>
          <li>
            Description: <strong>“{part.description}”</strong>
          </li>
          <li>
            Submission link:{' '}
            <a href={part.exerciseSubmissionLink}>
              {part.exerciseSubmissionLink}
            </a>
          </li>
        </>
      );
    case 'TypeScript 😏':
      return (
        <li>
          Description: <strong>“{part.description}”</strong>
        </li>
      );
    default:
      return assertNever(part);
  }
};

const Part: React.FC<PartProps> = ({ part }) => (
  <li>
    <strong>{part.name}</strong>
    <ul>
      <li>
        Exercise Count: <strong>{part.exerciseCount}</strong>
      </li>
      {renderPart(part)}
    </ul>
  </li>
);

export default Part;
