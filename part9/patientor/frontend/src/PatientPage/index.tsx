import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import {
  Patient,
  Diagnose,
  EntryType,
  EntryFormValues,
  FormValues,
  Entry
} from '../types';
import {
  Container,
  Header,
  List,
  Icon,
  Card,
  Button,
  Divider
} from 'semantic-ui-react';
import {
  useStateValue,
  updatePatient,
  setDiagnosisData,
  addEntry
} from '../state';
import EntryDetails from '../EntryDetail';
import { AddEntryModal } from '../AddModal';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: FormValues) => {
    console.log(values);
    const entry = { ...values } as EntryFormValues;
    switch (entry.type) {
      case EntryType.Hospital: {
        entry.discharge = {
          date: entry.dischargeDate,
          criteria: entry.dischargeCriteria
        };
        delete entry.employerName;
        delete entry.healthCheckRating;
        break;
      }
      case EntryType.OccupationalHealthcare: {
        if (!!entry.sickLeaveStartDate || !!entry.sickLeaveEndDate) {
          entry.sickLeave = {
            startDate: entry.sickLeaveStartDate,
            endDate: entry.sickLeaveEndDate
          };
        }
        delete entry.healthCheckRating;
        break;
      }
      default:
        break;
    }
    delete entry.dischargeDate;
    delete entry.dischargeCriteria;
    delete entry.sickLeaveStartDate;
    delete entry.sickLeaveEndDate;
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      closeModal();
      dispatch(addEntry(id, newEntry));
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data);
    }
  };

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
    <Container fluid>
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Divider />
      <Button
        content="Add New Entry"
        color="teal"
        icon="add"
        labelPosition="left"
        onClick={() => openModal()}
      />
    </Container>
  );
};

export default PatientPage;
