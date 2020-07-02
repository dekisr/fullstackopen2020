import express from 'express';

import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});