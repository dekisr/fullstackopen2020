import React from 'react';
import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const OccupationalHealthcareEntry: React.FC<{
  entry: OccupationalHealthcareEntryType;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card style={{ flexGrow: '1' }}>
      <Card.Content style={{ flexGrow: '0' }}>
        <Card.Header>
          <Icon name="doctor" size="large" />
          {entry.date}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Description>
          <em>
            <strong>{entry.specialist}</strong>
          </em>
        </Card.Description>
      </Card.Content>
      <Card.Content style={{ flexGrow: entry.sickLeave ? '0' : '1' }}>
        <p>
          <strong>Employer name: </strong>
          {entry.employerName}
        </p>
      </Card.Content>
      {(entry.sickLeave?.startDate || entry.sickLeave?.endDate) && (
        <Card.Content>
          <p>
            <strong>Sick Leave</strong>
          </p>
          <Card.Description>
            <p>
              <strong>start date: </strong>
              {entry.sickLeave?.startDate || '---------------'}
            </p>
            <p>
              <strong>end date: </strong>
              {entry.sickLeave?.endDate || '---------------'}
            </p>
          </Card.Description>
        </Card.Content>
      )}
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
