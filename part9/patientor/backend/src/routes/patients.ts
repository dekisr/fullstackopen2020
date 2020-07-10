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

router.get('/:id', (request, response) => {
  const patient = patientsService.getPatient(request.params.id);
  if (patient) {
    response.status(200).json(patient);
  } else {
    response.status(400).json({ error: 'patient not found' });
  }
});

export default router;
