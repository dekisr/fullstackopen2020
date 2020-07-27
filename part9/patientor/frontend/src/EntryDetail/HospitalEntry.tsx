import React from 'react';
import { HospitalEntry as HospitalEntryType } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card style={{ flexGrow: '1' }}>
      <Card.Content style={{ flexGrow: '0' }}>
        <Card.Header>
          <Icon name="medkit" size="large" />
          {entry.date}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          <em>
            <strong>{entry.specialist}</strong>
          </em>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <p>
          <strong>Discharge</strong>
        </p>
        <Card.Description>
          <p>
            <strong>Date: </strong>
            {entry.discharge.date}
          </p>
          <p>
            <strong>Criteria: </strong>
            {entry.discharge.criteria}
          </p>
        </Card.Description>
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
