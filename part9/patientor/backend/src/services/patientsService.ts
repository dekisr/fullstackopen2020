import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { PatientNoSsn, NewPatient, Patient, EntryNoId, Entry } from '../types';

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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntry = (id: string, entry: EntryNoId): Entry => {
  const newEntry: Entry = {
    id: uuidv4(),
    ...entry
  };
  const patient: Patient | undefined = patients.find(
    (patient) => patient.id === id
  );
  if (patient) {
    const updatedEntries: Entry[] = patient?.entries
      // immutable deep copy
      .map((entry) => ({ ...entry }))
      .concat(newEntry) as Entry[];
    const index = patients.findIndex((patient) => patient.id === id);
    patients[index].entries = updatedEntries;
    return newEntry;
  } else {
    throw new Error(`Patient not found.`);
  }
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry
};
