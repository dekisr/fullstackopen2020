import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  TextField,
  DiagnosisSelection,
  SelectField,
  TypeOption,
  NumberField
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
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
        healthCheckRating: ''
      }}
      onSubmit={onSubmit}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validate={(values: { [field: string]: any }) => {
        const errors: { [field: string]: string } = {};
        const regexDate = /^\d{4}[-/.](0?[1-9]|1[012])[-/.](0?[1-9]|[12][0-9]|3[01])$/;
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
          case 'OccupationalHealthcare': {
            requiredFields = [...requiredFields, 'employerName'];
            const optionalFields = ['sickLeaveStartDate', 'sickLeaveEndDate'];
            for (const field of optionalFields) {
              if (values[field] && !regexDate.test(values[field])) {
                errors[field] = 'Invalid date (YYYY-MM-DD) (./-) (M/D)';
              }
            }
            break;
          }
          case 'HealthCheck': {
            requiredFields = [...requiredFields, 'healthCheckRating'];
            const regexHR = /^[0-3]$/m;
            if (
              values.healthCheckRating &&
              !regexHR.test(values.healthCheckRating)
            ) {
              errors.healthCheckRating = 'Invalid Health Check Rating Number';
            }
            break;
          }
          default: {
            errors.type = 'You must select a type';
            break;
          }
        }
        for (const field of requiredFields) {
          if (!values[field] && values[field] !== 0) {
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
            {values.type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStartDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEndDate"
                  component={TextField}
                />
              </>
            )}
            {values.type === 'HealthCheck' && (
              <>
                <Field
                  label="Health Check Rating"
                  placeholder="Rating (0~3)"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
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
