import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddPatientForm from './AddPatientForm';
import { FormValues } from '../types';
import AddEntryForm from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  error?: string;
}

export const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error
}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
