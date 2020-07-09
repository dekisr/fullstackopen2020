import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import './index.css';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
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
