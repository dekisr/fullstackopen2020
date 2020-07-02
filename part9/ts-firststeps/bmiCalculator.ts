interface BmiArguments {
  height: number;
  weight: number;
}
const error = (message: string): Error => { throw new Error(message); };
const parseArguments = (args: Array<string>): BmiArguments => {
  args.length !== 4 &&
    error(
      'Error:\n' +
      'You should pass exactly two arguments.\n' +
      'One for height and another for weight.'
    );

  (!isFinite(Number(args[2])) || !isFinite(Number(args[3]))) &&
    error('Error:\nProvided values were not numbers!');

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

type Result = string;
const calculateBmi = (height: number, weight: number): Result => {
  height /= 100;
  const bmi: number = Number((weight / height ** 2).toFixed(2));
  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi < 16:
      return 'Severely underweight';
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25:
      return 'Normal (healthy weight)';
    case bmi < 30:
      return 'Overweight';
    case bmi < 35:
      return 'Obese Class I (Moderately obese)';
    case bmi < 40:
      return 'Obese Class II (Severely obese)';
    default:
      return 'Obese Class III (Very severely obese)';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  console.log(error.message);
}

export default calculateBmi;