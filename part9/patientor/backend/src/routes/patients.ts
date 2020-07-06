import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_request, response) => {
  // response.send('fetching patients...');
  response.send(patientsService.getPatients());
});

router.post('/', (request, response) => {
  try {
    const newPatient = toNewPatient(request.body);
    const addedPatient = patientsService.addPatient(newPatient);
    response.json(addedPatient);
  } catch (error) {
    response.status(400).send((error as Error).message);
  }
});

export default router;
