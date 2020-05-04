import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
  axios.get(baseUrl)
    .then((response) => response.data)

const add = (personObj) =>
  axios
    .post(baseUrl, personObj)
    .then((response) => response.data)

export default { getAll, add }
