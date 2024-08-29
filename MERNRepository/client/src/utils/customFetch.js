import axios from 'axios';

// Creating the Base URL here:
const customFetch = axios.create({
  baseURL: '/api/v1',
});

export default customFetch;