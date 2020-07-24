import React from 'react';
import { Entry, EntryType } from '../types';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import HealthCheckEntry from './HealthCheckEntry';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
