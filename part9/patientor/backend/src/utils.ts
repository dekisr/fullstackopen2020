/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  EntryType,
  Diagnose,
  Discharge,
  SickLeave,
  HealthCheckRating,
  EntryNoId
} from './types';
import diagnoses from '../data/diagnoses';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name as string}`);
  }
  return name;
};
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn as string}`);
  }
  return ssn;
};
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation as string}`);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of birth: ${date as string}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender as string}`);
  }
  return gender;
};

// const isArray = (array: any): boolean => {
//   return Array.isArray(array);
// };
const isEntryArray = (array: Array<any>): array is Array<Entry> => {
  const entryType = Object.values(EntryType);
  const test = array.map((entry) => entryType.includes(entry.type));
  return !test.includes(false);
};
const parseEntries = (entries: any): Array<Entry> => {
  if (!entries || entries.length === 0) {
    return [];
  } else if (!Array.isArray(entries) || !isEntryArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries as string}`);
  }
  return entries;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};
const parseType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing entry type: ${type as string}`);
  }
  return type;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(
      `Incorrect or missing description: ${description as string}`
    );
  }
  return description;
};

const parseEntryDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing entry date: ${date as string}`);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist as string}`);
  }
  return specialist;
};

const isDiagCodes = (array: Array<any>): array is Array<Diagnose['code']> => {
  const codes = diagnoses.map(({ code }) => code);
  const test = array.every((code) => codes.includes(code));
  return test;
};
const parseDiagnosesCodes = (codesArray: any): Array<Diagnose['code']> => {
  if (!Array.isArray(codesArray) || !isDiagCodes(codesArray)) {
    throw new Error(`Incorrect diagnoses codes: ${codesArray as string}`);
  }
  return codesArray;
};

const isDischarge = (object: any): object is Discharge => {
  return (
    Object.keys(object).length === 2 &&
    Object.keys(object).includes('date') &&
    Object.keys(object).includes('criteria')
  );
};
const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    !discharge.date ||
    !discharge.criteria ||
    !isDischarge(discharge) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error(`Incorrect or missing discharge info.`);
  }
  return discharge;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employer name: ${name as string}`);
  }
  return name;
};
const isSickLeave = (object: any): object is SickLeave => {
  return (
    Object.keys(object).length === 2 &&
    Object.keys(object).includes('startDate') &&
    Object.keys(object).includes('endDate')
  );
};
const parseSickLeave = (sickleave: any): SickLeave => {
  if (
    !sickleave ||
    !isSickLeave(sickleave) ||
    (sickleave.startDate && !isDate(sickleave.startDate)) ||
    (sickleave.endDate && !isDate(sickleave.endDate))
  ) {
    throw new Error(`Incorrect or missing Sick Leave: ${sickleave as string}`);
  }
  return sickleave;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if ((!rating && rating !== 0) || !isHealthCheckRating(rating)) {
    throw new Error(
      `Incorrect or missing health check rating: ${rating as string}`
    );
  }
  return rating;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewEntry = (object: any): EntryNoId => {
  const entry: NewEntry = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseEntryDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes
      ? parseDiagnosesCodes(object.diagnosisCodes)
      : undefined
  };

  return entry.type === EntryType.Hospital
    ? { ...entry, discharge: parseDischarge(object.discharge) }
    : entry.type === EntryType.OccupationalHealthcare
    ? {
        ...entry,
        employerName: parseEmployerName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeave(object.sickLeave)
          : undefined
      }
    : entry.type === EntryType.HealthCheck
    ? {
        ...entry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    : assertNever(entry);
};
