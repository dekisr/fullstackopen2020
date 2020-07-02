export { };

interface exercisesArguments {
  target: number;
  hoursPerDay: Array<number>;
}
const error = (message: string): Error => { throw new Error(message); };
const parseArguments = (args: Array<string>): exercisesArguments => {
  args.length < 3 &&
    error(
      'Error:\n' +
      'You should pass numbers as arguments.\n' +
      'The first argument is your target.\n' +
      'The others are your training hours per day.\n' +
      'Example: npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4\n'
    );

  return {
    target: Number(args[2]),
    hoursPerDay:
      args
        .slice(3)
        .map((hrs) => Number(hrs) > 0 ? Number(hrs) : 0)
  };
};

interface Result {
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
): Result => {
  const average: number = exeHours.length &&
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

try {
  const { target, hoursPerDay } = parseArguments(process.argv);
  console.log(calculateExercises(hoursPerDay, target));
} catch (error) {
  console.log((error as Error).message);
}