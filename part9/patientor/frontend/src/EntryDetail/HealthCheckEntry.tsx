import React from 'react';
import { HealthCheckEntry as HealthCheckEntryType } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({
  entry
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="heartbeat" size="large" />
          {entry.date}
        </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
      </Card.Content>
      {entry.healthCheckRating >= 0 && (
        <Card.Content extra>
          <p>
            Health Check Rating:{' '}
            <Icon
              color={
                entry.healthCheckRating === 0
                  ? 'black'
                  : entry.healthCheckRating === 1
                  ? 'brown'
                  : entry.healthCheckRating === 2
                  ? 'yellow'
                  : entry.healthCheckRating === 3
                  ? 'green'
                  : 'grey'
              }
              name="heart"
            />
          </p>
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

export default HealthCheckEntry;
