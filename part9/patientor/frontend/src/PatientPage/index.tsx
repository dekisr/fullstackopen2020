import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { Container, Header, List, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFromApi);
        dispatch({ type: 'UPDATE_PATIENT', payload: patientFromApi });
      } catch (error) {
        console.log(error);
      }
    };
    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      fetchPatient();
    }
  }, [dispatch, patients, id]);
  return !patient ? null : (
    <Container>
      <Header as="h2">
        {patient?.name}{' '}
        <Icon
          name={
            patient?.gender === 'male'
              ? 'mars'
              : patient?.gender === 'female'
              ? 'venus'
              : 'genderless'
          }
        />{' '}
      </Header>
      <List>
        <List.Item>
          <strong>ssn:</strong> {patient?.ssn}
        </List.Item>
        <List.Item>
          <strong>ocuupation:</strong> {patient?.occupation}
        </List.Item>
      </List>
    </Container>
  );
};

export default PatientPage;
