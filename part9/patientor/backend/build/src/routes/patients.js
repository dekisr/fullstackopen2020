"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    // response.send('fetching patients...');
    response.send(patientsService_1.default.getPatients());
});
router.post('/', (request, response) => {
    try {
        const newPatient = utils_1.toNewPatient(request.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        response.json(addedPatient);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
router.get('/:id', (request, response) => {
    const patient = patientsService_1.default.getPatient(request.params.id);
    if (patient) {
        response.status(200).json(patient);
    }
    else {
        response.status(400).json({ error: 'patient not found' });
    }
});
router.post('/:id/entries', (request, response) => {
    try {
        const newEntry = utils_1.toNewEntry(request.body);
        const addedEntry = patientsService_1.default.addEntry(request.params.id, newEntry);
        response.status(200).json(addedEntry);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
exports.default = router;
