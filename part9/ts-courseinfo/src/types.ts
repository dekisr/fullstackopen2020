export interface CourseName {
  course: string;
}
// export interface Part {
//   name: string;
//   exerciseCount: number;
// }
// export interface CourseParts {
//   parts: Part[];
// }
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CousePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CousePartDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CousePartDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CousePartDescription {
  name: 'TypeScript 😏';
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
