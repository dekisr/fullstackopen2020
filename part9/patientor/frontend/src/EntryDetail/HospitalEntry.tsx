import React from 'react';
import { HospitalEntry as HospitalEntryType } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="medkit" size="large" />
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

export default HospitalEntry;
