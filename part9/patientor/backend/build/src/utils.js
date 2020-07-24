"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${occupation}`);
    }
    return occupation;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date of birth: ${date}`);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};
// const isArray = (array: any): boolean => {
//   return Array.isArray(array);
// };
const isEntryArray = (array) => {
    const entryType = Object.values(types_1.EntryType);
    const test = array.map((entry) => entryType.includes(entry.type));
    return !test.includes(false);
};
const parseEntries = (entries) => {
    if (!entries || entries.length === 0) {
        return [];
    }
    else if (!Array.isArray(entries) || !isEntryArray(entries)) {
        throw new Error(`Incorrect or missing entries: ${entries}`);
    }
    return entries;
};
exports.toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};
const isEntryType = (param) => {
    return Object.values(types_1.EntryType).includes(param);
};
const parseType = (type) => {
    if (!type || !isEntryType(type)) {
        throw new Error(`Incorrect or missing entry type: ${type}`);
    }
    return type;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description: ${description}`);
    }
    return description;
};
const parseEntryDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing entry date: ${date}`);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${specialist}`);
    }
    return specialist;
};
const isDiagCodes = (array) => {
    const codes = diagnoses_1.default.map(({ code }) => code);
    const test = array.every((code) => codes.includes(code));
    return test;
};
const parseDiagnosesCodes = (codesArray) => {
    if (!Array.isArray(codesArray) || !isDiagCodes(codesArray)) {
        throw new Error(`Incorrect diagnoses codes: ${codesArray}`);
    }
    return codesArray;
};
const isDischarge = (object) => {
    return (Object.keys(object).length === 2 &&
        Object.keys(object).includes('date') &&
        Object.keys(object).includes('criteria'));
};
const parseDischarge = (discharge) => {
    if (!discharge ||
        !discharge.date ||
        !discharge.criteria ||
        !isDischarge(discharge) ||
        !isDate(discharge.date) ||
        !isString(discharge.criteria)) {
        throw new Error(`Incorrect or missing discharge info.`);
    }
    return discharge;
};
const parseEmployerName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing employer name: ${name}`);
    }
    return name;
};
const isSickLeave = (object) => {
    return (Object.keys(object).length === 2 &&
        Object.keys(object).includes('startDate') &&
        Object.keys(object).includes('endDate'));
};
const parseSickLeave = (sickleave) => {
    if (!sickleave ||
        !isSickLeave(sickleave) ||
        !isDate(sickleave.startDate) ||
        !isDate(sickleave.endDate)) {
        throw new Error(`Incorrect or missing SickLeave: ${sickleave}`);
    }
    return sickleave;
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (rating) => {
    if (!rating || !isHealthCheckRating(rating)) {
        throw new Error(`Incorrect or missing health check rating: ${rating}`);
    }
    return rating;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.toNewEntry = (object) => {
    const entry = {
        type: parseType(object.type),
        description: parseDescription(object.description),
        date: parseEntryDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes
            ? parseDiagnosesCodes(object.diagnosisCodes)
            : undefined
    };
    return entry.type === types_1.EntryType.Hospital
        ? Object.assign(Object.assign({}, entry), { discharge: parseDischarge(object.discharge) }) : entry.type === types_1.EntryType.OccupationalHealthcare
        ? Object.assign(Object.assign({}, entry), { employerName: parseEmployerName(object.employerName), sickLeave: object.sickLeave
                ? parseSickLeave(object.sickLeave)
                : undefined }) : entry.type === types_1.EntryType.HealthCheck
        ? Object.assign(Object.assign({}, entry), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) }) : assertNever(entry);
};
