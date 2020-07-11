import React from 'react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const OccupationalHealthcareEntry: React.FC<{
  entry: OccupationalHealthcareEntryType;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="doctor" size="large" />
          {entry.date}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      {entry.diagnosisCodes?.map((code) => (
        <Card.Content extra key={code}>
          <p>
            <strong>{code}</strong> - {diagnoses[code]?.name}
          </p>
        </Card.Content>
      ))}
    </Card>
  );
};

export default OccupationalHealthcareEntry;
