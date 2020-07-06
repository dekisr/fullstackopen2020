"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    // response.send('fetching patients...');
    response.send(patientsService_1.default.getPatients());
});
router.post('/', (request, response) => {
    try {
        const newPatient = utils_1.default(request.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        response.json(addedPatient);
    }
    catch (error) {
        response.status(400).send(error.message);
    }
});
exports.default = router;
