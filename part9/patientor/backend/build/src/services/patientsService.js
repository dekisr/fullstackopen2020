"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v4() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    return patients_1.default.find((patient) => patient.id === id);
};
const addEntry = (id, entry) => {
    const newEntry = Object.assign({ id: uuid_1.v4() }, entry);
    const patient = patients_1.default.find((patient) => patient.id === id);
    if (patient) {
        const updatedEntries = patient === null || patient === void 0 ? void 0 : patient.entries.map((entry) => (Object.assign({}, entry))).concat(newEntry);
        const index = patients_1.default.findIndex((patient) => patient.id === id);
        patients_1.default[index].entries = updatedEntries;
        return newEntry;
    }
    else {
        throw new Error(`Patient not found.`);
    }
};
exports.default = {
    getPatients,
    addPatient,
    getPatient,
    addEntry
};
