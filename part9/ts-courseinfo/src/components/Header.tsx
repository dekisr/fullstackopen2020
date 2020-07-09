import React from 'react';
import { CourseName } from '../types';

const Header: React.FC<CourseName> = ({ course }) => <h1>{course}</h1>;

export default Header;
