import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  TextField,
  DiagnosisSelection,
  SelectField,
  TypeOption
} from './FormField';
import { EntryType, EntryFormValues } from '../types';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
const typeOptions: TypeOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthCare' },
  { value: EntryType.HealthCheck, label: 'HealthCheck' }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: 'unselected',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeave: null,
        healthCheckRating: null
      }}
      onSubmit={onSubmit}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validate={(values: { [field: string]: any }) => {
        let requiredFields: Array<string> = [
          'description',
          'date',
          'specialist',
          'type'
        ];
        switch (values.type) {
          case 'Hospital': {
            requiredFields = [
              ...requiredFields,
              'dischargeDate',
              'dischargeCriteria'
            ];
            break;
          }
          default:
            break;
        }
        console.log(requiredFields);
        const errors: { [field: string]: string } = {};
        if (values.type === 'unselected') {
          errors.type = 'You must select a type';
        }
        const regexDate = /^\d{4}[-/.](0?[1-9]|1[012])[-/.](0?[1-9]|[12][0-9]|3[01])$/;
        for (const field of requiredFields) {
          if (!values[field]) {
            errors[field] = 'Field is required';
          } else if (
            (field === 'date' || field === 'dischargeDate') &&
            !regexDate.test(values[field])
          ) {
            errors[field] = 'Invalid date (YYYY-MM-DD) (./-) (M/D)';
          }
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            {values.type === 'Hospital' && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="Discharge Date"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
