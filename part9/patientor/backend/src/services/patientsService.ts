import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { PatientNoSsn, NewPatient, Patient } from '../types';

const getPatients = (): Array<PatientNoSsn> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  );
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getPatients,
  addPatient,
  getPatient
};
