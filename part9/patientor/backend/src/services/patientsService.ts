import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { PatientNoSsn, NewPatient, Patient } from '../types';

const getPatients = (): Array<PatientNoSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
