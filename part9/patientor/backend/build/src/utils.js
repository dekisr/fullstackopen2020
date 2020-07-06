"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toNewPatient = (object) => {
    const newPatient = Object.assign({}, object);
    return newPatient;
};
exports.default = toNewPatient;
