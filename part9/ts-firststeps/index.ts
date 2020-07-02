import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isArray } from 'util';

const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack');
});

app.get('/bmi', (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);
  if (!!height && !!weight) {
    return response.status(200)
      .json({ weight, height, bmi: calculateBmi(height, weight) });
  } else {
    return response.status(400)
      .json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (request, response) => {
  interface Body {
    daily_exercises: Array<number>,
    target: number;
  }
  const { daily_exercises, target }: Body = request.body as Body;
  if (!daily_exercises || (target !== 0 && !target)) {
    return response.status(400).json({ error: "parameters missing" });
  } else if (!isArray(daily_exercises) || !isFinite(Number(target))) {
    return response.status(400).json({ error: "malformatted parameters" });
  } else {
    const formattedArray: Array<number> = // invalid entries should be 0
      daily_exercises
        .map((hrs) => Number(hrs) > 0 ? Number(hrs) : 0);
    return response
      .status(200)
      .json(calculateExercises(formattedArray, target));
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
