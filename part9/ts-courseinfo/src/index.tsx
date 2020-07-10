import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import './index.css';
import { CoursePart } from './types';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    },
    {
      name: 'TypeScript 😏',
      exerciseCount: 91823,
      description: 'More confusing descrption'
    }
  ];

  return (
    <main>
      <Header course={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </main>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
