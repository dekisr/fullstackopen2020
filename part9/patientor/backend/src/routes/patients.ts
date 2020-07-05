import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_request, response) => {
  // response.send('fetching patients...');
  response.send(patientsService.getPatients());
});

export default router;