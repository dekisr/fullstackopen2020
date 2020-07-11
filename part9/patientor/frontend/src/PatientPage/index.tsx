import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Diagnose } from '../types';
import { Container, Header, List, Icon, Card } from 'semantic-ui-react';
import { useStateValue, updatePatient, setDiagnosisData } from '../state';
import EntryDetails from '../EntryDetail';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFromApi);
        dispatch(updatePatient(patientFromApi));
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
  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisData(diagnosesFromApi));
      } catch (error) {
        console.log(error);
      }
    };
    !Object.keys(diagnoses).length && fetchDiagnoses();
  }, [dispatch, diagnoses]);
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
      <Header as="h3">entries</Header>
      <Card.Group>
        {patient?.entries.map((entry) => (
          <EntryDetails entry={entry} key={entry.id} />
        ))}
      </Card.Group>
    </Container>
  );
};

export default PatientPage;
