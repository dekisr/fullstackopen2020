interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exeHours: Array<number>,
  target: number
): ExerciseStats => {
  const average: number =
    exeHours.reduce((acc, curr) => acc + curr) / exeHours.length;
  const rating: number = average < target ? 1 : average === target ? 2 : 3;
  return {
    periodLength: exeHours.length,
    trainingDays: exeHours.filter(Boolean).length,
    success: average >= target,
    rating,
    ratingDescription:
      rating === 1 ? 'You did not reach the goal...' :
      rating === 2 ? 'Good. Goal accomplished.' :
      'Amazing! You exceeded the goal! ',
    target,
    average: Number(average.toFixed(2))
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));